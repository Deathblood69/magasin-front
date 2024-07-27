import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import error from '../src/error.vue'
import {vuetify} from '../src/plugins/vuetify'

describe('Tests de AppFormLayout', () => {
  test('Affichage de AppFormLayout', () => {
    const wrapper = mount(error, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper).toBeDefined()
  })
})
