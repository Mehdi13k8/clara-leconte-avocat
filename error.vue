<script setup lang="ts">
/**
 * Page d'erreur du cabinet — 404 et pannes serveur.
 *
 * Sans ce fichier, Nuxt sert la sienne : fond blanc, pas d'en-tête, pas de
 * pied de page, un titre d'onglet qui finit par « | Nuxt ». Sur le site d'un
 * cabinet, c'est le moment où l'on inspire le moins confiance, et le visiteur
 * n'a rien vers quoi cliquer — pas même le numéro de téléphone, qui est
 * pourtant la seule chose dont il a besoin.
 *
 * `error.vue` REMPLACE `app.vue` : ni en-tête, ni pied de page, ni bloc de
 * contact rapide ne sont montés automatiquement. Ils sont donc repris ici.
 */
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()
const site = useSiteContent()

const isNotFound = computed(() => error?.statusCode === 404)

const title = computed(() =>
  isNotFound.value ? 'Cette page n’existe pas' : 'Le site rencontre une difficulté')

const lead = computed(() =>
  isNotFound.value
    ? 'Le lien est peut-être ancien, ou l’adresse mal recopiée. Vous trouverez ci-dessous les pages du cabinet — et, si votre demande est urgente, le téléphone reste le plus direct.'
    : 'L’erreur vient du serveur, pas de votre navigateur. Réessayez dans un instant ; le cabinet reste joignable par téléphone et par e-mail.')

useHead({
  // Sans suffixe : `titleTemplate` de `nuxt.config.ts` ajoute déjà
  // « · Clara Leconte Avocate ».
  title: title,
  // Une page d'erreur qui se laisse indexer finit par apparaître en résultat
  // de recherche à la place de la page demandée.
  meta: [{ name: 'robots', content: 'noindex, follow' }]
})
</script>

<template>
  <div>
    <a class="skip-link" href="#contenu">Aller au contenu</a>
    <SiteHeader />

    <main id="contenu">
      <section class="page-intro">
        <div class="shell page-intro__inner">
          <p class="breadcrumb"><NuxtLink to="/">Accueil</NuxtLink><span aria-hidden="true">/</span>{{ error?.statusCode ?? 500 }}</p>
          <div class="page-intro__copy">
            <p class="kicker kicker--light">Erreur {{ error?.statusCode ?? 500 }}</p>
            <h1>{{ title }}</h1>
            <p class="page-intro__lead">{{ lead }}</p>
          </div>
        </div>
      </section>

      <section class="legal-page shell prose">
        <!-- `.scope-list` plutôt que `.footer-links` : ce dernier est écrit
             pour le pied de page sombre (texte gris clair) et passerait
             illisible sur ce fond papier. -->
        <nav class="scope-list" aria-label="Pages du site">
          <p class="list-title">Les pages du cabinet</p>
          <ul>
            <li><NuxtLink to="/">Accueil</NuxtLink></li>
            <li><NuxtLink to="/cabinet">Le cabinet</NuxtLink></li>
            <li><NuxtLink to="/domaines-dintervention">Domaines d’intervention</NuxtLink></li>
            <li v-for="item in site.expertises" :key="item.slug">
              <NuxtLink :to="`/${item.slug}`">{{ item.shortTitle }}</NuxtLink>
            </li>
            <li><NuxtLink to="/honoraires">Honoraires</NuxtLink></li>
            <li><NuxtLink to="/contact">Contact</NuxtLink></li>
          </ul>
        </nav>

        <h2>Joindre le cabinet</h2>
        <p>
          Téléphone : <a :href="`tel:${site.identity.phoneHref}`">{{ site.identity.phone }}</a><br>
          E-mail : <a :href="`mailto:${site.identity.email}`">{{ site.identity.email }}</a><br>
          {{ site.identity.address }}, {{ site.identity.postalCity }} — {{ site.identity.hours }}.
        </p>

        <div class="button-row">
          <NuxtLink class="button button--ink" to="/">Retour à l’accueil <span aria-hidden="true">→</span></NuxtLink>
          <NuxtLink class="text-link" to="/contact">Exposer une demande</NuxtLink>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
