<script setup lang="ts">
const site = useSiteContent()
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.identity.address}, ${site.identity.postalCity}`)}`
</script>

<template>
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-identity">
        <NuxtLink class="footer-logo" to="/" aria-label="Clara Leconte, avocate — accueil">
          <img src="/images/logo-leconte.svg" alt="Clara Leconte, avocate" width="152" height="163">
        </NuxtLink>
        <p>{{ site.identity.bar }}. Accompagnement en responsabilité civile, droit de la famille et droit civil et commercial.</p>
      </div>
      <div>
        <p class="footer-label">Navigation</p>
        <nav class="footer-links" aria-label="Navigation secondaire">
          <NuxtLink to="/">Accueil</NuxtLink>
          <NuxtLink to="/cabinet">Le cabinet</NuxtLink>
          <NuxtLink to="/domaines-dintervention">Domaines d’intervention</NuxtLink>
          <NuxtLink to="/honoraires">Honoraires</NuxtLink>
          <NuxtLink to="/contact">Contact</NuxtLink>
        </nav>
      </div>
      <div>
        <p class="footer-label">Domaines</p>
        <nav class="footer-links" aria-label="Domaines d’intervention">
          <NuxtLink v-for="item in site.expertises" :key="item.slug" :to="`/${item.slug}`">{{ item.shortTitle }}</NuxtLink>
        </nav>
      </div>
      <div>
        <p class="footer-label">Cabinet</p>
        <address class="footer-links">
          <a :href="mapsUrl" target="_blank" rel="noopener">{{ site.identity.address }}<br>{{ site.identity.postalCity }}</a>
          <a :href="`tel:${site.identity.phoneHref}`">{{ site.identity.phone }}</a>
          <a :href="`mailto:${site.identity.email}`">{{ site.identity.email }}</a>
          <span>{{ site.identity.hours }}</span>
        </address>
      </div>
    </div>
    <div class="shell footer-bottom">
      <span>© {{ new Date().getFullYear() }} Clara Leconte, tous droits réservés</span>
      <div>
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
        <NuxtLink to="/politique-confidentialite">Confidentialité</NuxtLink>
      </div>
    </div>
  </footer>
</template>
