import { EmailClient } from '@azure/communication-email'

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
const RATE_WINDOW_MS = 15 * 60 * 1000
const MAX_SUBMISSIONS_PER_WINDOW = 5
const submissions = new Map<string, number[]>()

function assertRateLimit(event: Parameters<typeof getRequestIP>[0]) {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const attempts = (submissions.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS)

  if (attempts.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    throw createError({ statusCode: 429, statusMessage: 'Trop de demandes. Veuillez réessayer un peu plus tard.' })
  }

  attempts.push(now)
  submissions.set(ip, attempts)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  // Honeypot: bots fill this hidden field; real visitors never see it.
  if (body.website) return { ok: true }

  assertRateLimit(event)

  const name = body.name ? sanitizeHeaderValue(body.name) : ''
  const phone = body.phone ? sanitizeHeaderValue(body.phone) : ''
  const email = body.email ? sanitizeHeaderValue(body.email) : ''
  const subject = body.subject ? sanitizeHeaderValue(body.subject) : ''
  const message = body.message?.trim()

  if (!name || !email || !subject || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Champs manquants.' })
  }
  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Adresse e-mail invalide.' })
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
