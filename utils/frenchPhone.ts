const FRENCH_NATIONAL_RE = /^0[1-9]\d{8}$/

export function normalizeFrenchPhone(value: string | undefined | null): string | null {
  if (!value) return null

  const compact = value.trim().replace(/[.\s\-()/]/g, '')
  if (!compact) return null

  let digits = compact.startsWith('+') ? compact.slice(1) : compact
  if (!/^\d+$/.test(digits)) return null
  if (digits.startsWith('00')) digits = digits.slice(2)

  let national: string
  if (digits.startsWith('33') && digits.length >= 11 && digits.length <= 12) {
    const rest = digits.slice(2)
    national = rest.startsWith('0') ? rest : `0${rest}`
  } else {
    national = digits
  }

  return FRENCH_NATIONAL_RE.test(national) ? national : null
}

export function isFrenchPhoneNumber(value: string | undefined | null): boolean {
  return normalizeFrenchPhone(value) !== null
}
