<script setup lang="ts">
const site = useSiteContent()
usePageSeo('Honoraires avocate Marseille', 'Honoraires de Maître Clara Leconte, avocate à Marseille : forfait, temps passé ou résultat, toujours encadrés par une convention écrite.', '/honoraires')
</script>

<template>
  <main id="contenu">
    <PageIntro eyebrow="Honoraires" title="Des modalités posées avant l’ouverture du dossier." intro="La question des honoraires est abordée avec clarté dès les premiers échanges, avant toute intervention engageante." />
    <section class="fees-intro">
      <div class="shell fees-intro__grid">
        <div><p class="kicker">Une convention écrite</p><h2>Un cadre adapté à la nature de votre affaire.</h2></div>
        <div class="prose">
          <p>Le montant des honoraires est fixé avec chaque client en tenant compte de la nature de l’affaire, de sa complexité, du travail prévisible et, lorsque cela est pertinent, de la situation du client.</p>
          <p>Les modalités retenues sont précisées dans une convention d’honoraires écrite. Vous pouvez ainsi décider de confier votre dossier au cabinet en connaissance de cause.</p>
        </div>
      </div>
    </section>
    <section class="fee-options">
      <div class="shell fee-options__grid fee-options__grid--three">
        <article v-for="(mode, index) in site.fees.modes" :key="mode.title">
          <span>0{{ index + 1 }}</span>
          <h2>{{ mode.title }}</h2>
          <p>{{ mode.text }}</p>
        </article>
      </div>
    </section>
    <section class="legal-aid-note">
      <div class="shell legal-aid-note__inner">
        <p class="kicker">Aide juridictionnelle</p>
        <p>Selon votre situation et la nature du dossier, une prise en charge totale ou partielle peut être envisagée au titre de l’aide juridictionnelle. Ce point est examiné lors du premier échange, au regard des conditions de ressources applicables.</p>
      </div>
    </section>
    <section class="legal-aid-note legal-aid-note--alt">
      <div class="shell legal-aid-note__inner">
        <p class="kicker">Protection juridique</p>
        <p>Un contrat d’assurance habitation, automobile ou bancaire comporte parfois une garantie de protection juridique, susceptible de couvrir tout ou partie des honoraires. Avant d’ouvrir le dossier, le cabinet vous invite à vérifier cette garantie auprès de votre assureur.</p>
      </div>
    </section>
    <ContactBand />
  </main>
</template>
