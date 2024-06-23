// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '2wYvpwBWJimjF7FW2hvyWmhBO5IAUCbT8kB8inWNGo36bcY7uSD4SOnN',
    // Keys within public are also exposed client-side
    public: {
      apiBase: 'https://api.pexels.com/v1/'
    }
  }
})
