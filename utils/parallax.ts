type ParallaxItem = {
  el: HTMLElement
  speed: number
}

const items = new Set<ParallaxItem>()
const byElement = new WeakMap<HTMLElement, ParallaxItem>()

let ticking = false
let reducedMotion = false
let listening = false
let mediaQuery: MediaQueryList | null = null

function mobileFactor() {
  return window.matchMedia('(max-width: 620px)').matches ? 0.55 : 1
}

function frame() {
  ticking = false
  if (reducedMotion || !items.size) return

  const viewport = window.innerHeight
  const factor = mobileFactor()

  items.forEach((item) => {
    const rect = item.el.getBoundingClientRect()
    if (rect.bottom < -120 || rect.top > viewport + 120) return

    const shift = (rect.top + rect.height / 2 - viewport / 2) * item.speed * factor
    const max = rect.height * 0.1
    const y = Math.max(-max, Math.min(max, shift))
    item.el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
  })
}

function requestTick() {
  if (ticking || reducedMotion) return
  ticking = true
  requestAnimationFrame(frame)
}

function onMotionPreferenceChange() {
  reducedMotion = Boolean(mediaQuery?.matches)
  if (reducedMotion) {
    items.forEach((item) => {
      item.el.style.transform = ''
    })
    return
  }
  requestTick()
}

function ensureListeners() {
  if (listening) return
  listening = true
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = mediaQuery.matches
  mediaQuery.addEventListener('change', onMotionPreferenceChange)
  window.addEventListener('scroll', requestTick, { passive: true })
  window.addEventListener('resize', requestTick, { passive: true })
}

function dropListeners() {
  if (!listening) return
  listening = false
  mediaQuery?.removeEventListener('change', onMotionPreferenceChange)
  window.removeEventListener('scroll', requestTick)
  window.removeEventListener('resize', requestTick)
  mediaQuery = null
}

export function registerParallax(el: HTMLElement, speed = 0.24) {
  if (typeof window === 'undefined') return

  ensureListeners()

  const existing = byElement.get(el)
  if (existing) {
    existing.speed = speed
    requestTick()
    return
  }

  const item: ParallaxItem = { el, speed }
  items.add(item)
  byElement.set(el, item)
  el.classList.add('parallax-img')
  requestTick()
}

export function unregisterParallax(el: HTMLElement) {
  const item = byElement.get(el)
  if (!item) return

  items.delete(item)
  byElement.delete(el)
  el.style.transform = ''
  el.classList.remove('parallax-img')

  if (!items.size) dropListeners()
}
