/**
 * Validation du formulaire de contact, séparée de la route pour être éprouvée
 * sans requête HTTP ni envoi de courriel (comme `contactRateLimit`).
 *
 * Les valeurs qui finissent dans un en-tête de courriel (nom, objet, adresse
 * de réponse) perdent leurs retours à la ligne : un « \r\nBcc: » glissé dans
 * le nom ajouterait sinon un destinataire.
 */
import { isFrenchPhoneNumber } from './frenchPhone.ts'

export interface ContactBody {
  name?: string
  phone?: string
  email?: string
  subject?: string
  message?: string
  /** Pot de miel : invisible pour un humain, rempli par les robots. */
  website?: string
}

export interface ContactFields {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

export type ContactValidation =
  | { ok: true, fields: ContactFields }
  | { ok: false, statusMessage: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HEADER_VALUE_RE = /[\r\n]+/g
export const MAX_MESSAGE_LENGTH = 5000

const sanitizeHeaderValue = (value: unknown) =>
  typeof value === 'string' ? value.replace(HEADER_VALUE_RE, ' ').trim() : ''

export function isHoneypotFilled(body: ContactBody | null | undefined): boolean {
  return Boolean(body?.website)
}

export function validateContact(body: ContactBody | null | undefined): ContactValidation {
  const name = sanitizeHeaderValue(body?.name)
  const phone = sanitizeHeaderValue(body?.phone)
  const email = sanitizeHeaderValue(body?.email)
  const subject = sanitizeHeaderValue(body?.subject)
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!name || !phone || !email || !subject || !message) {
    return { ok: false, statusMessage: 'Champs manquants.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, statusMessage: 'Adresse e-mail invalide.' }
  }
  if (!isFrenchPhoneNumber(phone)) {
    return { ok: false, statusMessage: 'Veuillez indiquer un numéro de téléphone français.' }
  }
  if (name.length > 120 || phone.length > 40 || subject.length > 160 || message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, statusMessage: 'Message trop long.' }
  }
  return { ok: true, fields: { name, phone, email, subject, message } }
}
