# Clara Leconte Avocat

Site Nuxt du cabinet. Repo autonome, inclus dans
[`Novagentic_group`](https://github.com/Mehdi13k8/Novagentic_group) au chemin
`clara/` (submodule).

Production : [claraleconteavocat.com](https://claraleconteavocat.com) — sidecar
Azure sur le port 3003, derrière le nginx de `Novagentic_group/proxy/`.
Les autres domaines IONOS redirigent vers celui-ci.

Un `git push` sur **ce** dépôt déploie Clara. Il ne déclenche ni Palier ni
le site vitrine Novagentic.

Azure tire l’image GHCR **anonymement**. Après le premier build, rendre le
package public (une fois) : GitHub → Packages → `clara-leconte-avocat` →
Package settings → Change visibility → Public. Sans ça le site répond 503.

## Démarrer

```bash
npm install
npm run dev
```

Le portrait est dans `public/images/cleconte_profil.jpeg`. Textes et
coordonnées (barreau, téléphone, adresse — encore à confirmer) : `content/site.json`.
