<script setup lang="ts">
const expertise = useSiteContent().expertises[2]
usePageSeo('Avocate droit civil et commercial Marseille', 'Contrats et litiges civils ou commerciaux à Marseille : Maître Clara Leconte vous accompagne en conseil et en contentieux.', '/droit-civil-commercial')
</script>
<template><ExpertisePage :expertise="expertise" /></template>
