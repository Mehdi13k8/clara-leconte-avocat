<script setup lang="ts">
const open = ref(false)
const scrolled = ref(false)
const route = useRoute()
const site = useSiteContent()

const overlay = computed(() => route.path === '/' && !scrolled.value)

watch(() => route.fullPath, () => { open.value = false })

const onScroll = () => { scrolled.value = window.scrollY > 20 }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const domainActive = computed(() =>
  route.path === '/domaines-dintervention' || site.expertises.some(item => route.path === `/${item.slug}`)
)
</script>

<template>
  <header class="site-header" :class="{ 'site-header--overlay': overlay && !open }">
    <div class="shell header-inner">
      <NuxtLink class="wordmark wordmark--light" to="/" aria-label="Clara Leconte Avocate — accueil">
        <span>Clara Leconte</span>
        <small>Avocate au Barreau de Marseille</small>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Navigation principale">
        <NuxtLink to="/cabinet" :aria-current="route.path === '/cabinet' ? 'page' : undefined">Le cabinet</NuxtLink>
        <div class="nav-dropdown">
          <NuxtLink
            to="/domaines-dintervention"
            :aria-current="domainActive ? 'page' : undefined"
            aria-haspopup="true"
          >
            Domaines
            <b aria-hidden="true">▾</b>
          </NuxtLink>
          <div class="nav-dropdown__menu">
            <NuxtLink
              v-for="item in site.expertises"
              :key="item.slug"
              :to="`/${item.slug}`"
            >{{ item.shortTitle }}</NuxtLink>
            <NuxtLink to="/domaines-dintervention">Tous les domaines</NuxtLink>
          </div>
        </div>
        <NuxtLink to="/honoraires" :aria-current="route.path === '/honoraires' ? 'page' : undefined">Honoraires</NuxtLink>
        <NuxtLink to="/contact" :aria-current="route.path === '/contact' ? 'page' : undefined">Contact</NuxtLink>
        <NuxtLink class="button button--outline button--small" to="/contact">Prendre RDV</NuxtLink>
      </nav>

      <button class="menu-toggle" type="button" :aria-expanded="open" aria-controls="mobile-navigation" @click="open = !open">
        <span>{{ open ? 'Fermer' : 'Menu' }}</span>
        <i aria-hidden="true" />
      </button>
    </div>

    <div v-if="open" id="mobile-navigation" class="mobile-panel">
      <nav class="shell mobile-nav" aria-label="Navigation mobile">
        <NuxtLink to="/">Accueil</NuxtLink>
        <NuxtLink to="/cabinet">Le cabinet</NuxtLink>
        <NuxtLink to="/domaines-dintervention">Domaines d’intervention</NuxtLink>
        <NuxtLink v-for="item in site.expertises" :key="item.slug" class="mobile-sub" :to="`/${item.slug}`">{{ item.shortTitle }}</NuxtLink>
        <NuxtLink to="/honoraires">Honoraires</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
        <div class="mobile-contact">
          <a :href="`tel:${site.identity.phoneHref}`">{{ site.identity.phone }}</a>
          <span>{{ site.identity.bar }}</span>
        </div>
      </nav>
    </div>
  </header>
</template>
