import {defineConfig} from 'cypress'

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    video: false,
    screenshotOnRunFailure: true,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
