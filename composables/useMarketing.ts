declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function useMarketing() {
  const config = useRuntimeConfig().public

  function trackContactConversion() {
    if (!import.meta.client) return
    window.gtag?.('event', 'contact_form_submit', { page_type: 'contact' })
    if (config.googleAdsContactConversion) {
      window.gtag?.('event', 'conversion', {
        send_to: config.googleAdsContactConversion,
        value: 1,
        currency: 'EUR'
      })
    }
    window.fbq?.('track', 'Contact')
  }

  return { trackContactConversion }
}
