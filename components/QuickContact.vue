<script setup lang="ts">
const site = useSiteContent()
</script>

<template>
  <aside class="quick-contact" aria-label="Contacter le cabinet">
    <a class="quick-contact__call" :href="`tel:${site.identity.phoneHref}`">
      <span>Appeler le cabinet</span>
      <strong>{{ site.identity.phone }}</strong>
    </a>
    <NuxtLink class="quick-contact__appointment" to="/contact">Demander un rendez-vous <span aria-hidden="true">→</span></NuxtLink>
  </aside>
</template>
