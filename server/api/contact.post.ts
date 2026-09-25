import { EmailClient } from '@azure/communication-email'
import { isFrenchPhoneNumber } from '~/utils/frenchPhone'
import { checkRateLimit, clientIpFromHeaders } from '~/utils/contactRateLimit'

interface ContactBody {
  name?: string
  phone?: string
  email?: string
  subject?: string
  message?: string
  website?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HEADER_VALUE_RE = /[\r\n]+/g
const sanitizeHeaderValue = (value: string) => value.replace(HEADER_VALUE_RE, ' ').trim()
const MAX_MESSAGE_LENGTH = 5000

/** Horodatages de soumission par IP (processus). Suffisant derrière Azure :
 * une seule instance sert le site ; un redémarrage vide la Map. */
const submissions = new Map<string, number[]>()

function assertContactRateLimit(event: Parameters<typeof getRequestIP>[0]) {
  const ip = clientIpFromHeaders(
    getHeader(event, 'x-forwarded-for') ?? undefined,
    getRequestIP(event) ?? undefined,
  )
  const result = checkRateLimit(submissions.get(ip) ?? [], Date.now())
  if (result.timestamps.length === 0) submissions.delete(ip)
  else submissions.set(ip, result.timestamps)
  if (!result.ok) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Trop de demandes. Veuillez réessayer un peu plus tard.',
    })
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  // Pot de miel rempli : on répond comme à un humain, sans rien envoyer —
  // et sans consommer le quota (même règle que Novagentic).
  if (body.website) return { ok: true }

  assertContactRateLimit(event)

  const name = body.name ? sanitizeHeaderValue(body.name) : ''
  const phone = body.phone ? sanitizeHeaderValue(body.phone) : ''
  const email = body.email ? sanitizeHeaderValue(body.email) : ''
  const subject = body.subject ? sanitizeHeaderValue(body.subject) : ''
  const message = body.message?.trim()

  if (!name || !phone || !email || !subject || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Champs manquants.' })
  }
  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Adresse e-mail invalide.' })
  }
  if (!isFrenchPhoneNumber(phone)) {
    throw createError({ statusCode: 400, statusMessage: 'Veuillez indiquer un numéro de téléphone français.' })
  }
  if (name.length > 120 || phone.length > 40 || subject.length > 160 || message.length > MAX_MESSAGE_LENGTH) {
    throw createError({ statusCode: 400, statusMessage: 'Message trop long.' })
  }

  const config = useRuntimeConfig()
  if (!config.acsConnectionString || !config.acsSenderAddress || !config.claraContactTo) {
    throw createError({ statusCode: 503, statusMessage: 'Envoi indisponible pour le moment.' })
  }

  const client = new EmailClient(config.acsConnectionString)
  const poller = await client.beginSend({
    senderAddress: config.acsSenderAddress,
    content: {
      subject: 'Nouvelle demande de contact via le site',
      plainText: [
        'Nouveau message depuis claraleconteavocat.com',
        '',
        `Nom : ${name}`,
        `E-mail : ${email}`,
        phone ? `Téléphone : ${phone}` : null,
        `Objet : ${subject}`,
        '',
        message,
      ].filter(Boolean).join('\n'),
    },
    recipients: { to: [{ address: config.claraContactTo }] },
    replyTo: [{ address: email, displayName: name }],
  })

  await poller.pollUntilDone()
  return { ok: true }
})
