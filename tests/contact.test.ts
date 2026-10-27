/**
 * Le formulaire de contact, sans serveur ni envoi de courriel : ce qui est
 * refusé, ce qui part dans les en-têtes, et qui est compté contre la limite.
 *
 *     npm test
 */
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { isHoneypotFilled, MAX_MESSAGE_LENGTH, validateContact } from '../utils/contactForm.ts'
import { checkRateLimit, clientIpFromHeaders, CONTACT_RATE_MAX, CONTACT_RATE_WINDOW_MS } from '../utils/contactRateLimit.ts'
import { normalizeFrenchPhone } from '../utils/frenchPhone.ts'

const valid = {
  name: 'Jeanne Martin',
  phone: '06 12 34 56 78',
  email: 'jeanne@example.fr',
  subject: 'Divorce',
  message: 'Bonjour, je souhaiterais un rendez-vous.',
}

describe('validateContact', () => {
  test('un formulaire complet passe, valeurs nettoyées', () => {
    const result = validateContact({ ...valid, name: '  Jeanne Martin  ', message: '\n  Bonjour  \n' })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.fields.name, 'Jeanne Martin')
    assert.equal(result.fields.message, 'Bonjour')
  })

  test('un corps vide ou absent est refusé, sans lever', () => {
    for (const body of [undefined, null, {}]) {
      assert.deepEqual(validateContact(body), { ok: false, statusMessage: 'Champs manquants.' })
    }
  })

  test('chaque champ est obligatoire', () => {
    for (const field of Object.keys(valid) as (keyof typeof valid)[]) {
      const result = validateContact({ ...valid, [field]: '   ' })
      assert.equal(result.ok, false, `${field} vide aurait dû être refusé`)
    }
  })

  test('un champ qui n\'est pas du texte est refusé, pas une erreur 500', () => {
    const result = validateContact({ ...valid, name: 42 as unknown as string })
    assert.deepEqual(result, { ok: false, statusMessage: 'Champs manquants.' })
  })

  test('adresse e-mail et téléphone français vérifiés', () => {
    assert.deepEqual(validateContact({ ...valid, email: 'jeanne@' }), { ok: false, statusMessage: 'Adresse e-mail invalide.' })
    assert.equal(validateContact({ ...valid, phone: '+1 212 555 0100' }).ok, false)
    assert.equal(validateContact({ ...valid, phone: '+33 6 12 34 56 78' }).ok, true)
  })

  test('les longueurs sont plafonnées', () => {
    assert.equal(validateContact({ ...valid, message: 'a'.repeat(MAX_MESSAGE_LENGTH) }).ok, true)
    assert.deepEqual(
      validateContact({ ...valid, message: 'a'.repeat(MAX_MESSAGE_LENGTH + 1) }),
      { ok: false, statusMessage: 'Message trop long.' },
    )
    assert.equal(validateContact({ ...valid, name: 'a'.repeat(121) }).ok, false)
    assert.equal(validateContact({ ...valid, subject: 'a'.repeat(161) }).ok, false)
  })

  test('aucun retour à la ligne n\'atteint un en-tête de courriel', () => {
    const result = validateContact({
      ...valid,
      name: 'Jeanne\r\nBcc: robot@example.com',
      subject: 'Objet\nX-Injected: 1',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.fields.name, 'Jeanne Bcc: robot@example.com')
    assert.doesNotMatch(result.fields.subject, /[\r\n]/)
  })

  test('le corps du message, lui, garde ses retours à la ligne', () => {
    const result = validateContact({ ...valid, message: 'Ligne 1\nLigne 2' })
    assert.equal(result.ok && result.fields.message, 'Ligne 1\nLigne 2')
  })
})

test('le pot de miel ne se déclenche que rempli', () => {
  assert.equal(isHoneypotFilled({ ...valid, website: 'http://spam.example' }), true)
  assert.equal(isHoneypotFilled({ ...valid, website: '' }), false)
  assert.equal(isHoneypotFilled(undefined), false)
})

describe('checkRateLimit', () => {
  test(`${CONTACT_RATE_MAX} demandes passent, la suivante attend la fin de la fenêtre`, () => {
    let stamps: number[] = []
    const t0 = 1_000_000
    for (let i = 0; i < CONTACT_RATE_MAX; i++) {
      const r = checkRateLimit(stamps, t0 + i)
      assert.equal(r.ok, true)
      stamps = r.timestamps
    }
    assert.equal(checkRateLimit(stamps, t0 + 10).ok, false)
    // La plus ancienne sort de la fenêtre : une place se libère.
    assert.equal(checkRateLimit(stamps, t0 + CONTACT_RATE_WINDOW_MS).ok, true)
  })

  test('un refus n\'allonge pas la pénalité', () => {
    const full = Array.from({ length: CONTACT_RATE_MAX }, (_, i) => i)
    const refused = checkRateLimit(full, 100)
    assert.equal(refused.ok, false)
    assert.equal(refused.timestamps.length, CONTACT_RATE_MAX)
  })
})

describe('clientIpFromHeaders', () => {
  test('la DERNIÈRE entrée de X-Forwarded-For, celle posée par le proxy', () => {
    assert.equal(clientIpFromHeaders('6.6.6.6, 203.0.113.7', '10.0.0.1'), '203.0.113.7')
  })

  test('sans en-tête, l\'adresse de la socket', () => {
    assert.equal(clientIpFromHeaders(undefined, '10.0.0.1'), '10.0.0.1')
    assert.equal(clientIpFromHeaders(' , ', undefined), 'unknown')
  })
})

test('normalizeFrenchPhone accepte les écritures usuelles', () => {
  for (const raw of ['0612345678', '06 12 34 56 78', '06.12.34.56.78', '+33 6 12 34 56 78', '0033612345678', '+33 (0)6 12 34 56 78']) {
    assert.equal(normalizeFrenchPhone(raw), '0612345678', raw)
  }
  assert.equal(normalizeFrenchPhone('12345'), null)
})
