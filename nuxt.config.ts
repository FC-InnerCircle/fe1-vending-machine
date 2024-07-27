// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  plugins: [
    '~/plugins/pinia-plugin-persistedstate.client.js',
  ],
  devtools: { enabled: true },
})