<script setup lang="ts">
const site = useSiteContent()
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.identity.address}, ${site.identity.postalCity}`)}`
</script>

<template>
  <footer class="site-footer">
    <div class="shell footer-callout">
      <div>
        <p class="kicker">Un premier échange</p>
        <h2>Besoin d’un conseil juridique&nbsp;?</h2>
        <p>Maître Leconte vous reçoit sur rendez-vous à Marseille.</p>
      </div>
      <NuxtLink class="button button--brass" to="/contact">Prendre rendez-vous <span aria-hidden="true">→</span></NuxtLink>
    </div>

    <div class="shell footer-grid">
      <div class="footer-identity">
        <NuxtLink class="wordmark wordmark--light" to="/">
          <span>Clara Leconte</span>
          <small>Avocate</small>
        </NuxtLink>
        <p>{{ site.identity.bar }}. Conseil et contentieux à Marseille.</p>
      </div>
      <div>
        <p class="footer-label">Navigation</p>
        <nav class="footer-links" aria-label="Navigation secondaire">
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
        </address>
      </div>
    </div>
    <div class="shell footer-bottom">
      <span>© {{ new Date().getFullYear() }} Clara Leconte</span>
      <div>
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
        <NuxtLink to="/politique-confidentialite">Confidentialité</NuxtLink>
      </div>
    </div>
  </footer>
</template>
