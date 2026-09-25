/**
 * Limite de débit du formulaire de contact, séparée de la route pour rester
 * testable sans requête HTTP (même règle que le site Novagentic).
 *
 * 5 demandes / 15 min par IP : assez pour un humain qui se trompe et
 * renvoie, trop peu pour un robot qui martèle.
 */

export const CONTACT_RATE_WINDOW_MS = 15 * 60 * 1000
export const CONTACT_RATE_MAX = 5

/**
 * IP client derrière un reverse proxy de confiance (Azure App Service).
 * `X-Forwarded-For` est une chaîne : le client peut inventer la gauche ;
 * le proxy ajoute à droite. On prend donc la DERNIÈRE entrée, pas la
 * première (contrairement à `getRequestIP({ xForwardedFor: true })`).
 */
export function clientIpFromHeaders(
  forwardedFor: string | undefined,
  socketIp: string | undefined,
): string {
  if (forwardedFor) {
    const parts = forwardedFor.split(',').map(s => s.trim()).filter(Boolean)
    if (parts.length) return parts[parts.length - 1]!
  }
  return socketIp || 'unknown'
}

export type RateLimitCheck =
  | { ok: true, timestamps: number[] }
  | { ok: false, timestamps: number[] }

/** Filtre la fenêtre, refuse si pleine, sinon enregistre `now`. */
export function checkRateLimit(
  timestamps: readonly number[],
  now: number,
  max: number = CONTACT_RATE_MAX,
  windowMs: number = CONTACT_RATE_WINDOW_MS,
): RateLimitCheck {
  const recent = timestamps.filter(t => now - t < windowMs)
  if (recent.length >= max) return { ok: false, timestamps: recent }
  return { ok: true, timestamps: [...recent, now] }
}
