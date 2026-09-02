export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const { granted } = useTrackingConsent()
  let loaded = false

  function loadTracking() {
    if (loaded || !granted.value) return
    loaded = true

    if (config.gaMeasurementId || config.googleAdsId) {
      window.dataLayer = window.dataLayer ?? []
      function gtag() {
        window.dataLayer!.push(arguments)
      }
      window.gtag = window.gtag ?? (gtag as unknown as (...args: unknown[]) => void)
      const googleId = config.gaMeasurementId || config.googleAdsId
      const tag = document.createElement('script')
      tag.async = true
      tag.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`
      document.head.appendChild(tag)
      window.gtag('js', new Date())
      if (config.gaMeasurementId) {
        window.gtag('config', config.gaMeasurementId, { anonymize_ip: true })
      }
      if (config.googleAdsId) window.gtag('config', config.googleAdsId)
    }

    if (config.metaPixelId) {
      const fbq = function (...args: unknown[]) {
        const fn = fbq as typeof fbq & { callMethod?: (...params: unknown[]) => void, queue?: unknown[][] }
        if (fn.callMethod) fn.callMethod(...args)
        else (fn.queue ??= []).push(args)
      }
      const pixel = fbq as typeof fbq & { loaded?: boolean, version?: string, queue?: unknown[][] }
      pixel.loaded = true
      pixel.version = '2.0'
      pixel.queue = []
      window.fbq = fbq
      const tag = document.createElement('script')
      tag.async = true
      tag.src = 'https://connect.facebook.net/fr_FR/fbevents.js'
      document.head.appendChild(tag)
      window.fbq('init', config.metaPixelId)
      window.fbq('track', 'PageView')
    }
  }

  if (granted.value) loadTracking()
  watch(granted, loadTracking)
})
