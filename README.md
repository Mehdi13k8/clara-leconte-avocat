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

Les images du site sont dans `public/images/`. Les textes et coordonnées
professionnelles centralisés dans `content/site.json` ont été alignés sur
l’annuaire 2026 du Barreau de Marseille ; les changements futurs doivent être
répercutés dans ce fichier avant publication.
