<script setup lang="ts">
withDefaults(defineProps<{ eyebrow: string, title: string, intro?: string, number?: string }>(), { intro: '', number: '' })
</script>

<template>
  <section class="page-intro">
    <div class="shell page-intro__inner">
      <p class="breadcrumb"><NuxtLink to="/">Accueil</NuxtLink><span aria-hidden="true">/</span>{{ eyebrow }}</p>
      <div class="page-intro__copy">
        <p v-if="number" class="roman">{{ number }}</p>
        <h1>{{ title }}</h1>
        <p v-if="intro" class="page-intro__lead">{{ intro }}</p>
      </div>
    </div>
  </section>
</template>
