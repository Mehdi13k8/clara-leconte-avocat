<script setup lang="ts">
const site = useSiteContent()
const form = reactive({ name: '', phone: '', email: '', subject: '', message: '', website: '', consent: false })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

usePageSeo('Contacter le cabinet à Marseille', 'Contactez Maître Clara Leconte, avocate au Barreau de Marseille. Cabinet situé 23–25 rue Edmond Rostand, 13006 Marseille.', '/contact')

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.identity.address}, ${site.identity.postalCity}`)}`

const submitForm = async () => {
  status.value = 'sending'
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        subject: form.subject,
        message: form.message,
        website: form.website
      }
    })

    Object.assign(form, { name: '', phone: '', email: '', subject: '', message: '', website: '', consent: false })
    status.value = 'success'
  } catch (error: any) {
    status.value = 'error'
    errorMessage.value = error?.data?.statusMessage || 'Une erreur est survenue. Vous pouvez joindre le cabinet par téléphone.'
  }
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

        <form class="contact-form" @submit.prevent="submitForm">
          <p class="form-intro">Votre demande est transmise directement au cabinet. Pour votre confidentialité, ne joignez aucun document ni information sensible à ce premier message.</p>
          <p class="form-intro">L’envoi de ce formulaire ne vaut ni acceptation du dossier ni confirmation de rendez-vous.</p>
          <div class="honeypot" aria-hidden="true">
            <label>Ne pas remplir ce champ<input v-model="form.website" name="website" tabindex="-1" autocomplete="off"></label>
          </div>
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
          <label class="consent"><input v-model="form.consent" name="consent" type="checkbox" required><span>Je reconnais avoir pris connaissance de la politique de confidentialité applicable à ma demande. <NuxtLink to="/politique-confidentialite">En savoir plus</NuxtLink>.</span></label>
          <p v-if="status === 'success'" class="form-status form-status--success" role="status">Votre message a bien été transmis au cabinet. Merci.</p>
          <p v-else-if="status === 'error'" class="form-status form-status--error" role="alert">{{ errorMessage }}</p>
          <button class="button button--ink" type="submit" :disabled="status === 'sending'">
            <span v-if="status === 'sending'">Envoi en cours…</span>
            <span v-else>Envoyer ma demande <span aria-hidden="true">→</span></span>
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
