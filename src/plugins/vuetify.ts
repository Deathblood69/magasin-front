import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as labsComponents from 'vuetify/labs/components'

export const vuetify = createVuetify({
  // ... your configuration
  components: labsComponents,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#000091',
          drawer: '#2B2A39',
        },
      },
    },
  },
})

export default defineNuxtPlugin((app) => {
  app.vueApp.use(vuetify)
})
