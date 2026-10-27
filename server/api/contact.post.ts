import { EmailClient } from '@azure/communication-email'
import { checkRateLimit, clientIpFromHeaders } from '~/utils/contactRateLimit'
import { isHoneypotFilled, validateContact, type ContactBody } from '~/utils/contactForm'

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
  // `readBody` rend `undefined` pour un corps vide : `validateContact` le
  // refuse en 400 au lieu de laisser tomber la route en 500.
  const body = await readBody<ContactBody | undefined>(event)

  // Pot de miel rempli : on répond comme à un humain, sans rien envoyer —
  // et sans consommer le quota (même règle que Novagentic).
  if (isHoneypotFilled(body)) return { ok: true }

  assertContactRateLimit(event)

  const result = validateContact(body)
  if (!result.ok) {
    throw createError({ statusCode: 400, statusMessage: result.statusMessage })
  }
  const { name, phone, email, subject, message } = result.fields

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
