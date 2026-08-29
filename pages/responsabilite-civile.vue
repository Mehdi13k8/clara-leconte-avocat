<script setup lang="ts">
const expertise = useSiteContent().expertises[0]
usePageSeo('Avocate responsabilité civile Marseille', 'Indemnisation des victimes, préjudice corporel et responsabilité civile à Marseille : échangez avec Maître Clara Leconte.', '/responsabilite-civile')
</script>
<template><ExpertisePage :expertise="expertise" /></template>
