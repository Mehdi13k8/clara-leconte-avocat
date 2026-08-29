<script setup lang="ts">
const site = useSiteContent()
usePageSeo('Domaines d’intervention à Marseille', 'Responsabilité civile, droit de la famille, droit civil et commercial : découvrez les domaines d’intervention de Maître Clara Leconte à Marseille.', '/domaines-dintervention')
</script>

<template>
  <main id="contenu">
    <PageIntro eyebrow="Domaines d’intervention" title="Des compétences ciblées, une défense sur mesure." intro="Le cabinet intervient dans trois matières de droit privé, avec la même méthode : comprendre précisément les faits, rendre les options lisibles et construire une stratégie adaptée." />
    <ImageBand src="/images/escalier-marbre.webp" alt="Escalier monumental d’un palais de justice" />
    <section class="practice-index">
      <div class="shell practice-cards">
        <article v-for="item in site.expertises" :key="item.slug" class="practice-card">
          <span class="roman">{{ item.number }}</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.intro }}</p>
          <ul>
            <li v-for="point in item.points" :key="point">{{ point }}</li>
          </ul>
          <NuxtLink :to="`/${item.slug}`">En savoir plus <span aria-hidden="true">→</span></NuxtLink>
        </article>
      </div>
    </section>
    <section class="civil-wide-note">
      <div class="shell civil-wide-note__inner">
        <p class="kicker">Droit civil au sens large</p>
        <h2>Votre situation ne correspond pas exactement à l’un de ces domaines&nbsp;?</h2>
        <p>Le cabinet peut l’examiner lors d’un premier échange et, si nécessaire, vous orienter vers le professionnel compétent.</p>
        <NuxtLink class="text-link" to="/contact">Présenter votre demande</NuxtLink>
      </div>
    </section>
    <ContactBand />
  </main>
</template>
