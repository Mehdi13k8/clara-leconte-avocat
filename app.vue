<script setup lang="ts">
const site = useSiteContent()

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': ['LegalService', 'Attorney'],
      name: 'Cabinet de Maître Clara Leconte',
      image: 'https://claraleconteavocat.com/images/cleconte_profil.jpeg',
      url: 'https://claraleconteavocat.com',
      telephone: site.identity.phoneHref,
      email: site.identity.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.identity.address,
        postalCode: '13006',
        addressLocality: 'Marseille',
        addressCountry: 'FR'
      },
      areaServed: 'Marseille',
      priceRange: 'Honoraires sur convention',
      openingHours: 'Mo-Fr'
    })
  }]
})
</script>

<template>
  <div>
    <a class="skip-link" href="#contenu">Aller au contenu</a>
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
  </div>
</template>
