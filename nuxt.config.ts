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

    app: {
		head: {
			script: [
				{ src: 'https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js' },
			],
		}
	},

    plugins: [
		{ src: '~/plugins/vue-masonry', mode: 'client' },
		{ src: '~/plugins/vue-spinner', mode: 'client' }
	],

    modules: ["nuxt-feather-icons"]
})