<script setup lang="ts">
defineProps<{ src: string, alt: string, caption?: string }>()
</script>

<template>
  <figure class="image-band">
    <img :src="src" :alt="alt" width="1800" height="1170" loading="lazy">
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
