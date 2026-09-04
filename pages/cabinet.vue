<script setup lang="ts">
const site = useSiteContent()
usePageSeo('Votre avocate à Marseille', 'Découvrez l’approche de Maître Clara Leconte, avocate au Barreau de Marseille : écoute, rigueur et transparence.', '/cabinet')
</script>

<template>
  <main id="contenu">
    <PageIntro eyebrow="Le cabinet" title="Maître Clara Leconte" intro="Une pratique engagée aux côtés des victimes, des familles, des particuliers et des professionnels à Marseille." />
    <section class="lawyer-profile">
      <div class="shell lawyer-profile__grid">
        <figure class="lawyer-portrait">
          <div><img src="/images/cleconte_profil.jpeg" :alt="site.hero.portraitAlt" width="943" height="1171"></div>
          <figcaption>{{ site.identity.name }}<br><span>{{ site.identity.bar }}</span></figcaption>
        </figure>
        <div class="lawyer-copy">
          <p class="kicker">Présentation</p>
          <h2>{{ site.cabinet.quote }}</h2>
          <p v-for="paragraph in site.cabinet.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <p>Inscrite au Barreau de Marseille depuis sa prestation de serment du {{ site.identity.oathDate }}, Maître Leconte exerce depuis son cabinet situé rue Edmond Rostand.</p>
          <blockquote>«&nbsp;{{ site.cabinet.oath }}&nbsp;»<cite>Serment d’avocat</cite></blockquote>
          <dl class="cabinet-facts" aria-label="Repères du cabinet">
            <div v-for="stat in site.stats" :key="stat.label">
              <dt>{{ stat.value }}</dt>
              <dd>{{ stat.label }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <ImageBand src="/images/avocats-bureau.webp" alt="Entretien au cabinet d’avocat" caption="Écoute · Conseil · Défense" />

    <section class="milestones-section">
      <div class="shell">
        <div class="section-heading section-heading--split">
          <div><p class="kicker">Parcours</p><h2>Des repères simples, une pratique ancrée à Marseille.</h2></div>
          <p>Le cabinet s’appuie sur une inscription récente au barreau et sur un exercice de proximité, au service des dossiers qui lui sont confiés.</p>
        </div>
        <ol class="milestones">
          <li v-for="item in site.cabinet.milestones" :key="item.title">
            <span>{{ item.date }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="method-section method-section--paper">
      <div class="shell">
        <div class="section-heading section-heading--split">
          <div><p class="kicker">L’approche</p><h2>Trois principes qui cadrent chaque dossier.</h2></div>
          <p>La relation avec votre avocat repose sur des explications franches, une stratégie partagée et des échanges réguliers.</p>
        </div>
        <div class="method-grid">
          <article v-for="(item, index) in site.method" :key="item.title"><span>0{{ index + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p></article>
        </div>
      </div>
    </section>
    <ContactBand />
  </main>
</template>
