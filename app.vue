<script setup lang="ts">
const site = useSiteContent()

/**
 * Fiche du cabinet, posée sur TOUTES les pages : c'est l'entité que Google
 * rattache au nom « Clara Leconte » quand quelqu'un cherche une avocate à
 * Marseille, et elle doit être la même quelle que soit la page trouvée.
 *
 * Deux champs ont été RETIRÉS plutôt que corrigés, et c'est délibéré :
 *
 * - `priceRange` valait « Honoraires sur convention ». Ce champ attend un
 *   indicateur court (`€€`, une fourchette), pas une phrase ; une valeur non
 *   reconnue vaut moins que pas de valeur, parce qu'elle peut faire écarter
 *   la fiche entière. Et la page Honoraires dit déjà la vérité : forfait ou
 *   temps passé, arrêtés par convention écrite.
 * - `openingHours` valait « Mo-Fr », sans horaire. Un jour sans heure n'est
 *   pas exploitable. Le cabinet reçoit sur rendez-vous ; le jour où des
 *   plages fixes existent, c'est `openingHoursSpecification` qu'il faut, avec
 *   `opens` et `closes`.
 *
 * Pas de `geo` non plus : des coordonnées approximatives posent une épingle
 * de carte à côté de la porte, ce qui est pire que pas d'épingle. `hasMap`
 * renvoie à la recherche Google sur l'adresse exacte, qui, elle, est juste.
 */
const ENTITY_ID = 'https://claraleconteavocat.com/#cabinet'
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.identity.address}, ${site.identity.postalCity}`)}`

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': ['LegalService', 'Attorney'],
      '@id': ENTITY_ID,
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
        addressRegion: 'Provence-Alpes-Côte d’Azur',
        addressCountry: 'FR'
      },
      hasMap: mapsUrl,
      areaServed: [
        { '@type': 'City', name: 'Marseille' },
        { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône' }
      ],
      availableLanguage: { '@type': 'Language', name: 'Français', alternateName: 'fr' },
      // Les trois matières telles qu'elles sont écrites dans le contenu du
      // site : c'est ce qui rattache le cabinet à une question posée
      // (« avocate divorce Marseille ») plutôt qu'à son seul nom.
      knowsAbout: site.expertises.map(item => item.title),
      founder: {
        '@type': 'Person',
        name: site.identity.name,
        jobTitle: site.identity.profession,
        memberOf: { '@type': 'Organization', name: site.identity.bar }
      }
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
    <QuickContact />
  </div>
</template>
