<script setup lang="ts">
const site = useSiteContent()
usePageSeo('Avocate à Marseille', 'Maître Clara Leconte, avocate au Barreau de Marseille, intervient en responsabilité civile, droit de la famille et droit des contrats.', '/')
</script>

<template>
  <main id="contenu">
    <section class="home-hero">
      <img class="home-hero__image" src="/images/hero-colonnes.webp" alt="Architecture judiciaire à colonnade, Marseille" width="682" height="512" fetchpriority="high">
      <div class="home-hero__veil" />
      <div class="shell home-hero__inner">
        <p class="hero-badge">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M6 0l1.5 4.1H12L8.3 6.7 9.7 11 6 8.4 2.3 11l1.4-4.3L0 4.1h4.5z"/></svg>
          {{ site.hero.badge }}
        </p>
        <h1>{{ site.hero.title }}<br><em>{{ site.hero.titleAccent }}</em></h1>
        <p class="home-hero__lead">{{ site.hero.lead }}</p>
        <div class="button-row">
          <NuxtLink class="button button--brass" to="/contact">Prendre rendez-vous</NuxtLink>
          <NuxtLink class="button button--ghost" to="/domaines-dintervention">Nos expertises</NuxtLink>
        </div>
      </div>
      <a class="scroll-cue" href="#domaines">Découvrir <span aria-hidden="true">↓</span></a>
    </section>

    <section class="trust-strip" aria-label="Informations essentielles">
      <div class="shell trust-strip__grid">
        <div><span>01</span><p><strong>{{ site.identity.bar }}</strong><br>Cabinet établi à Marseille</p></div>
        <div><span>02</span><p><strong>Réponse sous {{ site.identity.replyDelay }}</strong><br>Un premier retour, confidentiel</p></div>
        <div><span>03</span><p><strong>Honoraires encadrés</strong><br>Une convention avant toute intervention</p></div>
      </div>
    </section>

    <section id="domaines" class="home-domains">
      <div class="shell">
        <div class="section-heading section-heading--split section-heading--light">
          <div>
            <p class="kicker kicker--light">Domaines d’expertise</p>
            <h2>Trois matières,<br>une même exigence<br>de précision.</h2>
          </div>
          <p>Un accompagnement juridique complet pour protéger vos intérêts en responsabilité civile, droit de la famille et droit des contrats.</p>
        </div>
        <div class="expertise-cards">
          <NuxtLink v-for="item in site.expertises" :key="item.slug" class="expertise-card" :to="`/${item.slug}`">
            <img :src="item.image" :alt="item.imageAlt" width="1800" height="1170" loading="lazy">
            <span class="expertise-card__veil" />
            <span class="expertise-card__body">
              <span class="roman">{{ item.number }}</span>
              <h3>{{ item.shortTitle }}</h3>
              <p>{{ item.intro }}</p>
              <em>En savoir plus</em>
            </span>
          </NuxtLink>
        </div>
        <p class="domain-note">Au-delà de ces matières, le cabinet reste à l’écoute de toute situation relevant du droit civil au sens large. <NuxtLink to="/contact">Exposez votre demande</NuxtLink> pour un premier échange.</p>
      </div>
    </section>

    <ImageBand src="/images/justice-fronton.webp" alt="Fronton d’un palais de justice" caption="Conseil · Négociation · Contentieux" />

    <section class="portrait-section">
      <div class="shell portrait-section__grid">
        <div class="portrait-frame">
          <img src="/images/cleconte_profil.jpeg" :alt="site.hero.portraitAlt" width="943" height="1171" loading="lazy">
          <span>Barreau de Marseille</span>
        </div>
        <div class="portrait-copy">
          <p class="kicker">Votre avocate à Marseille</p>
          <h2>Maître<br>Clara Leconte</h2>
          <p v-for="paragraph in site.cabinet.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <blockquote>«&nbsp;{{ site.cabinet.oath }}&nbsp;»<cite>Serment d’avocat</cite></blockquote>
          <dl class="cabinet-facts" aria-label="Repères du cabinet">
            <div v-for="stat in site.stats" :key="stat.label">
              <dt>{{ stat.value }}</dt>
              <dd>{{ stat.label }}</dd>
            </div>
          </dl>
          <NuxtLink class="text-link" to="/cabinet">Découvrir le cabinet</NuxtLink>
        </div>
      </div>
    </section>

    <section class="method-section">
      <div class="shell">
        <div class="section-heading"><p class="kicker">L’approche</p><h2>Une relation construite<br>sur des repères simples.</h2></div>
        <div class="method-grid">
          <article v-for="(item, index) in site.method" :key="item.title">
            <span>0{{ index + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="commitments-section">
      <div class="shell">
        <div class="section-heading">
          <p class="kicker">Ce que vous pouvez attendre</p>
          <h2>Des engagements tenus dès le premier échange.</h2>
        </div>
        <div class="commitments-grid">
          <article v-for="item in site.commitments" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <ContactBand />
  </main>
</template>
