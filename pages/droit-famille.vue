<script setup lang="ts">
const expertise = useSiteContent().expertises[1]
usePageSeo('Avocate droit de la famille Marseille', 'Divorce, séparation, autorité parentale et protection de l’enfant à Marseille : échangez avec Maître Clara Leconte.', '/droit-famille')
</script>
<template><ExpertisePage :expertise="expertise" /></template>
