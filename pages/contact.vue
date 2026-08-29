<script setup lang="ts">
const site = useSiteContent()
const form = reactive({ name: '', phone: '', email: '', subject: '', message: '', consent: false })

usePageSeo('Contacter le cabinet à Marseille', 'Contactez Maître Clara Leconte, avocate au Barreau de Marseille. Cabinet situé 23–25 rue Edmond Rostand, 13006 Marseille.', '/contact')

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.identity.address}, ${site.identity.postalCity}`)}`

const prepareEmail = () => {
  const subject = encodeURIComponent(`Demande de rendez-vous — ${form.subject}`)
  const body = encodeURIComponent(`Nom : ${form.name}\nTéléphone : ${form.phone}\nEmail : ${form.email}\n\n${form.message}`)
  window.location.href = `mailto:${site.identity.email}?subject=${subject}&body=${body}`
}
</script>

<template>
  <main id="contenu">
    <PageIntro eyebrow="Contact" title="Exposez votre situation en toute confidentialité." :intro="site.contact.lead" />
    <section class="contact-page">
      <div class="shell contact-page__grid">
        <aside class="contact-details">
          <p class="kicker">Le cabinet</p>
          <dl>
            <div><dt>Téléphone</dt><dd><a :href="`tel:${site.identity.phoneHref}`">{{ site.identity.phone }}</a></dd></div>
            <div><dt>E-mail</dt><dd><a :href="`mailto:${site.identity.email}`">{{ site.identity.email }}</a></dd></div>
            <div><dt>Adresse</dt><dd><a :href="mapsUrl" target="_blank" rel="noopener">{{ site.identity.address }}<br>{{ site.identity.postalCity }}</a></dd></div>
            <div><dt>Accueil</dt><dd>{{ site.identity.hours }}</dd></div>
          </dl>
          <p class="confidential-note">{{ site.contact.notice }}</p>
        </aside>

        <form class="contact-form" @submit.prevent="prepareEmail">
          <p class="form-intro">Votre messagerie s’ouvrira avec les informations saisies. Aucun document n’est téléversé sur ce site.</p>
          <div class="field-pair">
            <label>Nom et prénom<input v-model="form.name" name="name" autocomplete="name" required></label>
            <label>Téléphone<input v-model="form.phone" name="phone" type="tel" autocomplete="tel"></label>
          </div>
          <label>Adresse e-mail<input v-model="form.email" name="email" type="email" autocomplete="email" required></label>
          <label>Objet de votre demande
            <select v-model="form.subject" name="subject" required>
              <option disabled value="">Sélectionner un domaine</option>
              <option v-for="item in site.expertises" :key="item.slug" :value="item.shortTitle">{{ item.shortTitle }}</option>
              <option value="Autre demande">Autre demande</option>
            </select>
          </label>
          <label>Votre message<textarea v-model="form.message" name="message" rows="6" required /></label>
          <label class="consent"><input v-model="form.consent" name="consent" type="checkbox" required><span>J’accepte que ces informations soient utilisées afin de répondre à ma demande. <NuxtLink to="/politique-confidentialite">En savoir plus</NuxtLink>.</span></label>
          <button class="button button--ink" type="submit">Préparer l’e-mail <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </section>
  </main>
</template>
