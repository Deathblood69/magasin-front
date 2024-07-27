import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import AppPageErreur from '../../src/components/AppPageErreur.vue'
import {vuetify} from '~/plugins/vuetify'

describe('Tests de AppPageErreur', () => {
  test('Affichage du messsage par défaut', () => {
    const wrapper = mount(AppPageErreur, {
      props: {
        titre: 'Erreur',
        message: '',
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('Erreur')
    expect(wrapper.text()).toContain(
      'Une erreur est survenue lors du chargement de la page.',
    )
    expect(wrapper.text()).toContain('Page Précédente')
  })
  test('Affichage de AppFormLayout', () => {
    const wrapper = mount(AppPageErreur, {
      props: {
        titre: 'Page non trouvée',
        message: 'Page not found',
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('Page non trouvée')
    expect(wrapper.text()).toContain("La page que vous recherchez n'existe pas")
    expect(wrapper.text()).toContain('Page Précédente')
  })
})
