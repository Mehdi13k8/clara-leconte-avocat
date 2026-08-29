export default defineNuxtConfig({
  compatibilityDate: '2026-08-28',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    acsConnectionString: '',
    acsSenderAddress: 'DoNotReply@novagentic.fr',
    claraContactTo: 'c.leconte@avocatia.com'
  },
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
  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
      }
    }
  },
  nitro: {
    prerender: {
      routes: ['/', '/cabinet', '/domaines-dintervention', '/responsabilite-civile', '/droit-famille', '/droit-civil-commercial', '/honoraires', '/contact', '/mentions-legales', '/politique-confidentialite']
    }
  }
})
