<script setup lang="ts">
const site = useSiteContent()
usePageSeo('Mentions légales', 'Mentions légales du site de Maître Clara Leconte, avocate au Barreau de Marseille.', '/mentions-legales')
</script>

<template>
  <main id="contenu">
    <PageIntro eyebrow="Informations légales" title="Mentions légales" />
    <article class="legal-page shell prose">
      <h2>Éditeur du site</h2>
      <p>{{ site.identity.name }}, {{ site.identity.profession }} au {{ site.identity.bar }}, profession libérale.<br>{{ site.identity.address }}, {{ site.identity.postalCity }}.<br>Téléphone : <a :href="`tel:${site.identity.phoneHref}`">{{ site.identity.phone }}</a> · E-mail : <a :href="`mailto:${site.identity.email}`">{{ site.identity.email }}</a>.</p>
      <p>Directrice de la publication : Clara Leconte.</p>
      <h2>Hébergement</h2>
      <p>Le site est hébergé sur l’infrastructure Microsoft Azure de Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irlande.</p>
      <h2>Profession réglementée</h2>
      <p>La profession d’avocat est réglementée par la loi n° 71-1130 du 31 décembre 1971 et le décret n° 91-1197 du 27 novembre 1991. Maître Clara Leconte est inscrite au Barreau de Marseille et soumise aux règles professionnelles applicables aux avocats.</p>
      <h2>Médiation de la consommation</h2>
      <p>En cas de litige relatif aux honoraires ou à l’exécution de la convention, après réclamation écrite préalable auprès du cabinet, le client consommateur peut saisir le Médiateur de la consommation de la profession d’avocat : Madame Sandra Werey, 180 boulevard Haussmann, 75008 Paris · <a href="mailto:mediateur-conso@mediateur-consommation-avocat.fr">mediateur-conso@mediateur-consommation-avocat.fr</a> · <a href="https://mediateur-consommation-avocat.fr" target="_blank" rel="noopener">mediateur-consommation-avocat.fr</a>.</p>
      <h2>Contenus et responsabilité</h2>
      <p>Les contenus de ce site présentent l’activité du cabinet à titre informatif. Ils ne constituent pas une consultation juridique et ne remplacent pas l’examen personnel d’une situation.</p>
      <h2>Propriété intellectuelle</h2>
      <p>Les textes, éléments graphiques et photographies du site sont protégés. Toute reproduction ou adaptation sans autorisation préalable est interdite, hors exceptions prévues par la loi.</p>
    </article>
  </main>
</template>
