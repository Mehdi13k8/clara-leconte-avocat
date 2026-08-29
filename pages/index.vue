<script setup lang="ts">
const site = useSiteContent()
usePageSeo('Avocate à Marseille', 'Maître Clara Leconte, avocate au Barreau de Marseille, intervient en responsabilité civile, droit de la famille et droit des contrats.', '/')
</script>

<template>
  <main id="contenu">
    <section class="home-hero">
      <img class="home-hero__image" src="/images/hero-colonnes.webp" alt="Architecture judiciaire à colonnade" width="682" height="512" fetchpriority="high">
      <div class="home-hero__veil" />
      <div class="shell home-hero__inner">
        <p class="kicker kicker--light">{{ site.hero.eyebrow }}</p>
        <h1>Avocate à Marseille.<br>Défendre vos droits<br>avec rigueur,<br><em>vous accompagner</em><br>avec humanité.</h1>
        <p class="home-hero__lead">{{ site.hero.lead }}</p>
        <div class="button-row">
          <NuxtLink class="button button--brass" to="/contact">Demander un rendez-vous <span aria-hidden="true">→</span></NuxtLink>
          <NuxtLink class="text-link text-link--light" to="/domaines-dintervention">Découvrir les domaines</NuxtLink>
        </div>
      </div>
      <a class="scroll-cue" href="#domaines">Découvrir <span aria-hidden="true">↓</span></a>
    </section>

    <section class="trust-strip" aria-label="Informations essentielles">
      <div class="shell trust-strip__grid">
        <div><span>01</span><p><strong>{{ site.identity.bar }}</strong><br>Cabinet établi à Marseille</p></div>
        <div><span>02</span><p><strong>Échanges confidentiels</strong><br>Une écoute directe et personnelle</p></div>
        <div><span>03</span><p><strong>Honoraires encadrés</strong><br>Une convention avant toute intervention</p></div>
      </div>
    </section>

    <section id="domaines" class="home-domains">
      <div class="shell">
        <div class="section-heading section-heading--split section-heading--light">
          <div><p class="kicker kicker--light">Domaines d’intervention</p><h2>Trois matières,<br>une même exigence<br>de précision.</h2></div>
          <p>Un accompagnement construit autour des moments où vos droits, votre famille ou votre activité ont besoin d’être défendus.</p>
        </div>
        <div class="domain-grid">
          <article v-for="item in site.expertises" :key="item.slug">
            <span class="roman">{{ item.number }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.intro }}</p>
            <NuxtLink :to="`/${item.slug}`">Comprendre l’accompagnement <span aria-hidden="true">→</span></NuxtLink>
          </article>
        </div>
        <p class="domain-note">Au-delà de ces matières, le cabinet reste à l’écoute de toute situation relevant du droit civil au sens large. <NuxtLink to="/contact">Exposez votre demande</NuxtLink> pour un premier échange.</p>
      </div>
    </section>

    <figure class="courtroom-break">
      <img src="/images/hall-marbre.jpg" alt="Hall de palais de justice en marbre" width="1600" height="1040" loading="lazy">
      <figcaption>Conseil · Négociation · Contentieux</figcaption>
    </figure>

    <section class="portrait-section">
      <div class="shell portrait-section__grid">
        <div class="portrait-frame">
          <img src="/images/cleconte_profil.jpeg" :alt="site.hero.portraitAlt" width="943" height="1171" loading="lazy">
          <span>Barreau de Marseille</span>
        </div>
        <div class="portrait-copy">
          <p class="kicker">Le cabinet</p>
          <h2>Maître<br>Clara Leconte</h2>
          <p v-for="paragraph in site.cabinet.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <blockquote>«&nbsp;{{ site.cabinet.oath }}&nbsp;»<cite>Serment d’avocat</cite></blockquote>
          <dl class="cabinet-facts" aria-label="Repères du cabinet">
            <div><dt>03</dt><dd>domaines d’intervention</dd></div>
            <div><dt>01</dt><dd>interlocutrice dédiée</dd></div>
            <div><dt>13 006</dt><dd>Marseille</dd></div>
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

    <ContactBand />
  </main>
</template>
