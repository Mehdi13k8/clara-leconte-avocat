<script setup lang="ts">
const site = useSiteContent()
const route = useRoute()
</script>

<template>
  <aside v-if="route.path !== '/contact'" class="quick-contact" aria-label="Contacter le cabinet">
    <a class="quick-contact__call" :href="`tel:${site.identity.phoneHref}`">
      <span>Appeler le cabinet</span>
      <strong>{{ site.identity.phone }}</strong>
    </a>
    <NuxtLink class="quick-contact__appointment" to="/contact">Prendre rendez-vous</NuxtLink>
  </aside>
</template>
