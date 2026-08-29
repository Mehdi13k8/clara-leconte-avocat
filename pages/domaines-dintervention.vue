<script setup lang="ts">
const site = useSiteContent()
usePageSeo('Domaines d’intervention à Marseille', 'Responsabilité civile, droit de la famille, droit civil et commercial : découvrez les domaines d’intervention de Maître Clara Leconte à Marseille.', '/domaines-dintervention')
</script>

<template>
  <main id="contenu">
    <PageIntro eyebrow="Domaines d’intervention" title="Des compétences ciblées, une défense sur mesure." intro="Le cabinet intervient dans trois matières de droit privé, avec la même méthode : comprendre précisément les faits, rendre les options lisibles et construire une stratégie adaptée." />
    <section class="practice-index">
      <div class="shell">
        <article v-for="item in site.expertises" :key="item.slug" class="practice-row">
          <span class="roman">{{ item.number }}</span>
          <div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.intro }}</p>
          </div>
          <ul><li v-for="point in item.points" :key="point">{{ point }}</li></ul>
          <NuxtLink :to="`/${item.slug}`" :aria-label="`En savoir plus — ${item.title}`">↗</NuxtLink>
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
