<script setup lang="ts">
const config = useRuntimeConfig().public
const { decided, setConsent } = useTrackingConsent()
const configured = computed(() => Boolean(
  config.gaMeasurementId || config.googleAdsId || config.metaPixelId
))
</script>

<template>
  <aside v-if="configured && !decided" class="tracking-consent" aria-label="Consentement aux traceurs">
    <p>
      Avec votre accord, le cabinet utilise Google et Meta pour mesurer
      l’efficacité de ses campagnes. Aucun contenu de votre demande n’est transmis.
    </p>
    <div>
      <button type="button" @click="setConsent('denied')">Refuser</button>
      <button type="button" class="tracking-consent__accept" @click="setConsent('granted')">Accepter</button>
    </div>
  </aside>
</template>

<style scoped>
.tracking-consent {
  position: fixed; z-index: 100; right: 18px; bottom: 18px; max-width: 560px;
  padding: 18px; border: 1px solid var(--line); background: var(--white);
  box-shadow: 0 14px 38px rgb(18 27 36 / 20%);
}
.tracking-consent p { margin: 0 0 12px; color: var(--muted); font-size: .82rem; line-height: 1.55; }
.tracking-consent div { display: flex; justify-content: flex-end; gap: 10px; }
.tracking-consent button { padding: 9px 14px; border: 1px solid var(--line); background: transparent; cursor: pointer; }
.tracking-consent__accept { background: var(--ink) !important; color: var(--paper); }
@media (max-width: 640px) {
  .tracking-consent { right: 0; bottom: 0; left: 0; max-width: none; }
}
</style>
