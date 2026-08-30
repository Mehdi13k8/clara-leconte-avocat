import Lenis from 'lenis'
import { tickParallax } from '~/utils/parallax'

export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const lenis = new Lenis({
    autoRaf: true,
    anchors: true,
    lerp: 0.085,
    wheelMultiplier: 0.9,
    smoothWheel: true,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true
  })

  lenis.on('scroll', tickParallax)

  nuxtApp.hook('page:finish', () => {
    lenis.resize()
  })

  nuxtApp.hook('app:beforeUnmount', () => {
    lenis.destroy()
  })
})
