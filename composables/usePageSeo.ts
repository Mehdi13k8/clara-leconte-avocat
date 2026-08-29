export const usePageSeo = (title: string, description: string, path: string) => {
  const canonical = `https://claraleconteavocat.com${path}`
  useSeoMeta({
    title,
    description,
    ogTitle: `${title} · Clara Leconte Avocate`,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogImage: 'https://claraleconteavocat.com/images/hero-colonnes.webp',
    twitterCard: 'summary_large_image',
    robots: 'index, follow'
  })
  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}
