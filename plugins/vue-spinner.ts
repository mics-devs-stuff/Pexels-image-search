import { vue3Spinner } from 'vue3-spinner';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vue3Spinner)
})