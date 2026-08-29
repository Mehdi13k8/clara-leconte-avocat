<script setup lang="ts">
usePageSeo('Honoraires du cabinet', 'Les honoraires de Maître Clara Leconte sont définis par une convention écrite, selon la nature, la complexité et les besoins du dossier.', '/honoraires')
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
      <div class="shell fee-options__grid">
        <article><span>01</span><h2>Honoraires au forfait</h2><p>Un montant global peut être convenu pour une mission définie dont les contours sont suffisamment prévisibles.</p></article>
        <article><span>02</span><h2>Honoraires au temps passé</h2><p>Un taux horaire peut s’appliquer au temps effectivement consacré lorsque l’ampleur du dossier ne peut être déterminée à l’avance.</p></article>
      </div>
    </section>
    <section class="legal-aid-note">
      <div class="shell legal-aid-note__inner">
        <p class="kicker">Aide juridictionnelle & protection juridique</p>
        <p>Selon votre situation et la nature du dossier, une prise en charge peut être envisagée au titre de l’aide juridictionnelle ou de votre contrat de protection juridique. Ces possibilités et les conditions d’intervention du cabinet sont examinées lors du premier échange.</p>
      </div>
    </section>
    <ContactBand />
  </main>
</template>
