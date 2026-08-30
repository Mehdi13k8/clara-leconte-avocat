<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt: string
  caption?: string
  position?: string
}>(), { position: '50% 50%' })
</script>

<template>
  <figure class="image-band">
    <img
      v-parallax="0.12"
      :src="src"
      :alt="alt"
      :style="{ objectPosition: position }"
      width="2400"
      height="1560"
      loading="lazy"
    >
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
