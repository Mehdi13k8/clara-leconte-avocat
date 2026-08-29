<script setup lang="ts">
const open = ref(false)
const route = useRoute()
const site = useSiteContent()

watch(() => route.fullPath, () => { open.value = false })

const nav = [
  { label: 'Le cabinet', to: '/cabinet' },
  { label: 'Domaines', to: '/domaines-dintervention' },
  { label: 'Honoraires', to: '/honoraires' }
]

const active = (to: string) => route.path === to || (to === '/domaines-dintervention' && site.expertises.some(item => route.path === `/${item.slug}`))
</script>

<template>
  <header class="site-header">
    <div class="shell header-inner">
      <NuxtLink class="wordmark" to="/" aria-label="Clara Leconte Avocate — accueil">
        <span>Clara Leconte</span>
        <small>Avocate</small>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Navigation principale">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" :aria-current="active(item.to) ? 'page' : undefined">{{ item.label }}</NuxtLink>
        <NuxtLink class="button button--ink button--small" to="/contact">Demander un rendez-vous</NuxtLink>
      </nav>

      <button class="menu-toggle" type="button" :aria-expanded="open" aria-controls="mobile-navigation" @click="open = !open">
        <span>{{ open ? 'Fermer' : 'Menu' }}</span>
        <i aria-hidden="true" />
      </button>
    </div>

    <div v-if="open" id="mobile-navigation" class="mobile-panel">
      <nav class="shell mobile-nav" aria-label="Navigation mobile">
        <NuxtLink to="/">Accueil</NuxtLink>
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
        <div class="mobile-contact">
          <a :href="`tel:${site.identity.phoneHref}`">{{ site.identity.phone }}</a>
          <span>{{ site.identity.bar }}</span>
        </div>
      </nav>
    </div>
  </header>
</template>
