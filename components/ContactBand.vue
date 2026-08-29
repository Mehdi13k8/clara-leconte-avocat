<script setup lang="ts">
const site = useSiteContent()
</script>

<template>
  <section class="contact-band">
    <div class="shell contact-band__inner">
      <div>
        <p class="kicker">Besoin d’un conseil juridique&nbsp;?</p>
        <h2>Une situation à exposer&nbsp;?</h2>
        <p>Maître Leconte vous reçoit {{ site.identity.hours.toLowerCase() }}.</p>
      </div>
      <NuxtLink class="button button--brass" to="/contact">Prendre rendez-vous <span aria-hidden="true">→</span></NuxtLink>
    </div>
  </section>
</template>
