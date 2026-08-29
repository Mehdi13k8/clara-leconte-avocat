const SITE = 'https://claraleconteavocat.com'

/**
 * Image d'aperçu des partages, en 1200×630.
 *
 * Elle remplace `hero-colonnes.webp`, qui servait à la fois de fond de page
 * d'accueil et d'aperçu social. Deux raisons de l'en sortir :
 *
 * - **Sa taille.** 682×512. Sous 1200×630, `summary_large_image` de X
 *   retombe sur une vignette carrée, et LinkedIn refuse purement et
 *   simplement l'image en dessous de 200 px de côté utile — le lien du
 *   cabinet sortait sans visuel sur le réseau où un avocat est recommandé.
 * - **Son contenu.** Une photo de colonnade ne dit ni le nom du cabinet ni
 *   la matière. À la taille d'une vignette dans un fil, un aperçu doit se
 *   lire, pas seulement décorer.
 *
 * Le fichier est produit depuis la même photo, aux couleurs et aux fontes du
 * site (voir la carte composée dans l'historique du dépôt).
 */
const OG_IMAGE = `${SITE}/images/og-cabinet.jpg`
const OG_IMAGE_ALT = 'Clara Leconte, avocate au Barreau de Marseille'

export const usePageSeo = (title: string, description: string, path: string) => {
  const canonical = `${SITE}${path}`
  useSeoMeta({
    title,
    description,
    ogTitle: `${title} · Clara Leconte Avocate`,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogSiteName: 'Clara Leconte Avocate',
    ogImage: OG_IMAGE,
    // Déclarées explicitement : sans elles, Facebook et LinkedIn doivent
    // télécharger l'image avant de savoir s'ils peuvent l'afficher en grand,
    // et un premier partage sort souvent sans visuel le temps de leur cache.
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: OG_IMAGE_ALT,
    twitterCard: 'summary_large_image',
    twitterTitle: `${title} · Clara Leconte Avocate`,
    twitterDescription: description,
    twitterImage: OG_IMAGE,
    twitterImageAlt: OG_IMAGE_ALT,
    robots: 'index, follow'
  })
  useHead({ link: [
    { rel: 'canonical', href: canonical },
    { rel: 'alternate', hreflang: 'fr', href: canonical }
  ] })
}
