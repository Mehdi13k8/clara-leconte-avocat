<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  intro?: string
  number?: string
  crumbs?: { label: string, to?: string }[]
}>(), { intro: '', number: '', crumbs: () => [] })
</script>

<template>
  <section class="page-intro">
    <div class="shell page-intro__inner">
      <p class="breadcrumb">
        <template v-if="crumbs.length">
          <template v-for="(crumb, index) in crumbs" :key="crumb.label">
            <NuxtLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
            <span v-else>{{ crumb.label }}</span>
            <span v-if="index < crumbs.length - 1" aria-hidden="true">/</span>
          </template>
        </template>
        <template v-else>
          <NuxtLink to="/">Accueil</NuxtLink><span aria-hidden="true">/</span>{{ eyebrow }}
        </template>
      </p>
      <div class="page-intro__copy">
        <p v-if="number" class="roman">{{ number }}</p>
        <h1>{{ title }}</h1>
        <p v-if="intro" class="page-intro__lead">{{ intro }}</p>
      </div>
    </div>
  </section>
</template>
