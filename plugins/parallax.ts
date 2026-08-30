import { registerParallax, unregisterParallax } from '~/utils/parallax'

function speedFrom(value: unknown) {
  return typeof value === 'number' ? value : 0.24
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('parallax', {
    mounted(el, binding) {
      registerParallax(el as HTMLElement, speedFrom(binding.value))
    },
    updated(el, binding) {
      registerParallax(el as HTMLElement, speedFrom(binding.value))
    },
    unmounted(el) {
      unregisterParallax(el as HTMLElement)
    }
  })
})
