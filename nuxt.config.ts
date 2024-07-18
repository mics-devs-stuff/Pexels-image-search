// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    runtimeConfig: {
		// Keys within public are also exposed client-side
		public: {
			apiBase: 'https://api.pexels.com/v1/',
			// The private keys which are only available server-side
			pexelsApiKey: process.env.PEXELS_API_KEY,
		}
	},

    css: ['~/assets/css/main.css'],

    postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

    plugins: [
		{ src: '~/plugins/vue-masonry', mode: 'client' }
	],

    modules: ["nuxt-feather-icons"],

	build: {
		transpile: ['pexels'],
	},
})