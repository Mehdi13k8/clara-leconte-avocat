export default defineNuxtConfig({
  compatibilityDate: '2026-08-28',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      titleTemplate: '%s · Clara Leconte Avocate',
      meta: [
        { name: 'theme-color', content: '#1d2530' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:locale', content: 'fr_FR' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Karla:wght@300;400;500;600&display=swap' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/', '/cabinet', '/domaines-dintervention', '/responsabilite-civile', '/droit-famille', '/droit-civil-commercial', '/honoraires', '/contact', '/mentions-legales', '/politique-confidentialite']
    }
  }
})
