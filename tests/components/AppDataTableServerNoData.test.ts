import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import AppDataTableServerNoData from '../../src/components/AppDataTableServerNoData.vue'
import {vuetify} from '../../src/plugins/vuetify'

describe('Tests de AppDataTableServerNoData', () => {
  test('Cas Nominal', () => {
    const wrapper = mount(AppDataTableServerNoData, {
      props: {
        error: false,
      },
      global: {
        plugins: [vuetify],
      },
    })

    // Recherchez le texte dans le composant et Vérifiez si le texte recherché existe dans le composant
    const texte = wrapper.text().includes('Aucun résultat')
    expect(texte).toBeTruthy()

    // Recherchez l'icone dans le composant et Vérifiez si le texte recherché existe dans le composant
    const icone = wrapper.find('.mdi-information')
    expect(icone).toBeDefined()

    // Recherchez la couleur dans le composant et Vérifiez si le texte recherché existe dans le composant
    const couleur = wrapper.find('.text-error')
    expect(couleur).toBeDefined()
  })
  test('Une erreur est survenue', () => {
    const wrapper = mount(AppDataTableServerNoData, {
      props: {
        error: true,
      },
      global: {
        plugins: [vuetify],
      },
    })

    // Recherchez le texte dans le composant et Vérifiez si le texte recherché existe dans le composant
    const texte = wrapper.text().includes('Une erreur est survenue')
    expect(texte).toBeTruthy()

    // Recherchez l'icone dans le composant et Vérifiez si le texte recherché existe dans le composant
    const icone = wrapper.find('.mdi-close-circle')
    expect(icone).toBeDefined()

    // Recherchez la couleur dans le composant et Vérifiez si le texte recherché existe dans le composant
    const couleur = wrapper.find('.text-error')
    expect(couleur).toBeDefined()
  })
})
