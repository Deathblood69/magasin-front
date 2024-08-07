import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devServer: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
  },

  // @ts-ignore
  srcDir: 'src/',

  runtimeConfig: {
    public: {
      FETCH_LIST_INTERVALE: process.env.FETCH_LIST_INTERVALE || '5000'
    }
  },

  ssr: false,
  typescript: {typeCheck: true, strict: true},
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  devtools: {enabled: true},

  build: {
    transpile: ['vuetify']
  },

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

  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080/',
          changeOrigin: true
        },
        '/camera': {
          target: 'http://127.0.0.1:8888/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/camera/, '')
        }
      }
    }
  },

  app: {
    head: {
      title: 'Magasin',
      link: [{rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg'}]
    }
  },

  compatibilityDate: '2024-07-25'
})
