import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import AppPopover from '../../src/components/AppPopover.vue'
import {vuetify} from '../../src/plugins/vuetify'

describe('Tests de AppPopover', () => {
  test('Cas Nominal', () => {
    const wrapper = mount(AppPopover, {
      props: {
        titleButton: 'Fermer',
        icon: 'mdi-filter-menu',
      },
      global: {
        plugins: [vuetify],
      },
    })

    // Recherchez le texte dans le composant
    const texteTrouve = wrapper.text().includes('Fermer')

    // Vérifiez si le texte recherché existe dans le composant
    expect(texteTrouve).toBeTruthy()
  })
})
