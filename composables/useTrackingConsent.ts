export type TrackingConsent = 'granted' | 'denied'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 180

export function useTrackingConsent() {
  const cookie = useCookie<TrackingConsent | undefined>('clara_tracking_consent', {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    default: () => undefined
  })
  const choice = useState<TrackingConsent | null>('tracking-consent', () => cookie.value ?? null)
  const decided = computed(() => choice.value !== null)
  const granted = computed(() => choice.value === 'granted')

  function setConsent(next: TrackingConsent) {
    choice.value = next
    cookie.value = next
  }

  return { decided, granted, setConsent }
}
