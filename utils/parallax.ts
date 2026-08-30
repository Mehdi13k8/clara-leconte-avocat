type ParallaxItem = {
  el: HTMLElement
  clip: HTMLElement
  speed: number
}

const items = new Set<ParallaxItem>()
const byElement = new WeakMap<HTMLElement, ParallaxItem>()

let ticking = false
let reducedMotion = false
let listening = false
let mediaQuery: MediaQueryList | null = null

function findClip(el: HTMLElement) {
  return (el.closest('.home-hero, .image-band, .expertise-card__media, .expertise-card') as HTMLElement)
    || el.parentElement
    || el
}

function mobileFactor() {
  return window.matchMedia('(max-width: 620px)').matches ? 0.7 : 1
}

function frame() {
  ticking = false
  if (reducedMotion || !items.size) return

  const viewport = window.innerHeight
  const factor = mobileFactor()

  items.forEach((item) => {
    const clip = item.clip.getBoundingClientRect()
    if (clip.bottom < -80 || clip.top > viewport + 80) return

    const shift = (clip.top + clip.height / 2 - viewport / 2) * item.speed * factor
    const overflow = Math.max(24, (item.el.offsetHeight - item.clip.clientHeight) * 0.42)
    const y = Math.max(-overflow, Math.min(overflow, shift))
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

export function registerParallax(el: HTMLElement, speed = 0.18) {
  if (typeof window === 'undefined') return

  ensureListeners()

  const existing = byElement.get(el)
  if (existing) {
    existing.speed = speed
    existing.clip = findClip(el)
    requestTick()
    return
  }

  const item: ParallaxItem = { el, clip: findClip(el), speed }
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
