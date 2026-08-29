<script setup lang="ts">
const props = defineProps<{ expertise: ReturnType<typeof useSiteContent>['expertises'][number] }>()
const site = useSiteContent()
const others = computed(() => site.expertises.filter(item => item.slug !== props.expertise.slug))
</script>

<template>
  <main id="contenu">
    <PageIntro :eyebrow="expertise.shortTitle" :number="expertise.number" :title="expertise.title" :intro="expertise.intro" />

    <section class="editorial-section">
      <div class="shell expertise-overview">
        <div class="expertise-statement">
          <p class="kicker">L’intervention du cabinet</p>
          <h2>{{ expertise.lead }}</h2>
          <p>À Marseille, Maître Clara Leconte vous aide à qualifier la situation, à mesurer les options disponibles et à choisir une démarche adaptée à vos priorités.</p>
        </div>
        <div class="scope-list">
          <p class="list-title">Le cabinet intervient notamment pour</p>
          <ul>
            <li v-for="point in expertise.points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="process-section">
      <div class="shell">
        <div class="section-heading section-heading--split">
          <div><p class="kicker">Une méthode lisible</p><h2>Comment se déroule l’accompagnement</h2></div>
          <p>Les étapes sont adaptées à chaque situation. Elles sont expliquées avant toute décision engageante.</p>
        </div>
        <ol class="process-grid">
          <li v-for="(step, index) in expertise.process" :key="step">
            <span>0{{ index + 1 }}</span>
            <h3>{{ ['Premier échange', 'Stratégie', 'Suivi'][index] }}</h3>
            <p>{{ step }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="local-note">
      <div class="shell local-note__inner">
        <p class="kicker">Ancrage local</p>
        <p>Le cabinet est établi à Marseille et intervient devant les juridictions compétentes, notamment le tribunal judiciaire de Marseille et, selon la procédure, la cour d’appel d’Aix-en-Provence.</p>
      </div>
    </section>

    <section class="related-section">
      <div class="shell">
        <p class="kicker">Autres domaines d’intervention</p>
        <div class="related-grid">
          <NuxtLink v-for="item in others" :key="item.slug" :to="`/${item.slug}`">
            <span>{{ item.number }}</span><h2>{{ item.title }}</h2><b aria-hidden="true">↗</b>
          </NuxtLink>
        </div>
      </div>
    </section>
    <ContactBand />
  </main>
</template>
