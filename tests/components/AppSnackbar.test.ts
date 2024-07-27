import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import AppSnackbar from '../../src/components/AppSnackbar.vue'
import {vuetify} from '../../src/plugins/vuetify'

describe('Tests de AppSnackbar', () => {
  test('Cas Nominal', () => {
    const wrapper = mount(AppSnackbar, {
      props: {
        snackbar: {
          open: true,
          message: 'Essai',
          color: 'success',
          timeout: 3000,
        },
        icon: 'mdi-check-circle-outline',
      },
      global: {
        plugins: [vuetify],
      },
      attachTo: document.body,
    })

    const snackbarHTML = document.getElementsByClassName(
      'v-overlay-container',
    )[0]?.innerHTML

    // Recherchez le texte dans le composant
    const texteTrouve = snackbarHTML.includes('Essai')

    // Vérifiez si le texte recherché existe dans le composant
    expect(texteTrouve).toBeTruthy()
  })
})
