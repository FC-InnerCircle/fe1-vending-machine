<template>
  <NuxtPage />
</template>

<script setup>
import { createPinia } from 'pinia'

// Pinia 초기화
const pinia = createPinia()

// Nuxt 애플리케이션에 Pinia 추가
defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(pinia)
})

// 페이지 헤드 설정
useHead({
  title: 'Nuxt3 Vending Machine',
})
</script>