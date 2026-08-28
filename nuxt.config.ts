export default defineNuxtConfig({
  compatibilityDate: '2026-08-28',
  devtools: { enabled: true },
  app: { head: { htmlAttrs: { lang: 'fr' }, link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap' }
  ] } }
})
