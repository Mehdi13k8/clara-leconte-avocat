<script setup lang="ts">
const props = withDefaults(defineProps<{ eyebrow: string, title: string, intro?: string, number?: string }>(), { intro: '', number: '' })

const route = useRoute()

/**
 * Le fil d'Ariane est déjà à l'écran juste en dessous ; ce bloc le dit à
 * Google, qui remplace alors l'URL brute du résultat par « Accueil ›
 * Honoraires ». Sur un cabinet dont les pages s'appellent
 * `/droit-civil-commercial`, c'est la différence entre une adresse à
 * déchiffrer et un chemin qui se lit.
 *
 * Il est émis ICI, dans le composant qui rend le fil visible, et pas dans
 * `usePageSeo` : les deux se nourrissent du même `eyebrow`, donc ils ne
 * peuvent pas diverger. Un balisage qui décrit un fil d'Ariane absent de la
 * page est précisément ce qui fait retirer l'affichage enrichi.
 */
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://claraleconteavocat.com/' },
        { '@type': 'ListItem', position: 2, name: props.eyebrow, item: `https://claraleconteavocat.com${route.path}` }
      ]
    }))
  }]
})
</script>

<template>
  <section class="page-intro">
    <div class="shell page-intro__inner">
      <p class="breadcrumb"><NuxtLink to="/">Accueil</NuxtLink><span aria-hidden="true">/</span>{{ eyebrow }}</p>
      <div class="page-intro__copy">
        <p v-if="number" class="roman">{{ number }}</p>
        <h1>{{ title }}</h1>
        <p v-if="intro" class="page-intro__lead">{{ intro }}</p>
      </div>
    </div>
  </section>
</template>
