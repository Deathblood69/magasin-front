import {defineVitestConfig} from '@nuxt/test-utils/config'
import {configDefaults} from 'vitest/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...configDefaults.coverage.exclude,
        '**/types/**/*',
        '**/constants/**/*',
      ],
    },
  },
})
