<script setup lang="ts">
const site = useSiteContent()
usePageSeo('Politique de confidentialité', 'Politique de confidentialité et traitement des données de contact du cabinet de Maître Clara Leconte.', '/politique-confidentialite')
</script>

<template>
  <main id="contenu">
    <PageIntro eyebrow="Données personnelles" title="Politique de confidentialité" />
    <article class="legal-page shell prose">
      <h2>Responsable du traitement</h2>
      <p>{{ site.identity.name }} est responsable des données que vous choisissez de transmettre pour contacter le cabinet. Vous pouvez exercer vos droits à l’adresse <a :href="`mailto:${site.identity.email}`">{{ site.identity.email }}</a>.</p>
      <h2>Données traitées et finalité</h2>
      <p>Le formulaire transmet vos nom, coordonnées et message au cabinet afin de prendre connaissance de votre demande, de vous répondre et, le cas échéant, de préparer un rendez-vous. La base légale de ce traitement est votre demande de contact et les mesures précontractuelles qui peuvent en découler. Nous vous invitons à ne pas transmettre de pièces ni d’informations sensibles via ce premier échange.</p>
      <h2>Durée et destinataires</h2>
      <p>Les informations sont accessibles au cabinet et transitent par son prestataire technique d’envoi d’e-mails, Novagentic via Azure Communication Services. À défaut d’ouverture d’un dossier, elles sont conservées pendant trois ans à compter du dernier échange ; en cas d’ouverture d’un dossier, les obligations professionnelles et légales applicables déterminent leur conservation. Elles ne sont ni vendues ni utilisées à des fins de prospection commerciale.</p>
      <h2>Vos droits</h2>
      <p>Vous pouvez demander l’accès, la rectification ou l’effacement de vos données, ainsi que la limitation ou l’opposition au traitement lorsque ces droits sont applicables. Vous pouvez également saisir la CNIL si vous estimez que vos droits ne sont pas respectés.</p>
      <h2>Cookies et ressources externes</h2>
      <p>Le site n’utilise pas de dispositif de suivi publicitaire. Les polices typographiques peuvent être chargées depuis les serveurs de Google Fonts, ce qui implique une connexion technique à ce service lors de l’affichage des pages.</p>
    </article>
  </main>
</template>
