import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config

const APP_CONFIG = {
  titre: "Le Virgini'z",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  apiUrl: 'http://127.0.0.1:8080/',
  apiBase: '/api',
  fetchInterval: process.env.FETCH_LIST_INTERVALE || '5000'
}

export default defineNuxtConfig({
  app: {
    head: {
      title: APP_CONFIG.titre
    }
  },

  // @ts-ignore
  build: {
    transpile: ['vuetify']
  },

  compatibilityDate: '2024-07-25',

  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  devServer: {
    port: APP_CONFIG.port
  },
  devtools: {enabled: true},
  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
    async (_options: {}, nuxt: Record<string, any>) => {
      // @ts-ignore
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        config.plugins.push(vuetify())
      )
    }
    //...
  ],

  runtimeConfig: {
    app: {
      TITRE: APP_CONFIG.titre
    },
    public: {
      API_URL: APP_CONFIG.apiUrl,
      API_BASE: APP_CONFIG.apiBase,
      FETCH_LIST_INTERVALE: APP_CONFIG.fetchInterval
    }
  },

  srcDir: 'src/',

  ssr: false,

  typescript: {typeCheck: true, strict: true},

  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    },
    server: {
      proxy: {
        '/api': {
          target: APP_CONFIG.apiUrl,
          changeOrigin: true
        }
      }
    }
  }
})
