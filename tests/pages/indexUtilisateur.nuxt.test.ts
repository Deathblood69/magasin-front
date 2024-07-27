import {expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import index from '~/pages/administration/utilisateurs/index.vue'

const vuetify = createVuetify({
  components,
  directives,
})

const wrapper = mount(index, {
  global: {
    plugins: [vuetify],
  },
})

//les boutons de la page
const buttons = wrapper.findAllComponents(components.VBtn)

//la datatableServer
const table = wrapper.findComponent(components.VDataTableServer)

test('Affichage de la page index', () => {
  expect(wrapper.html()).toBeDefined()
  expect(table).toBeTruthy()
  expect(buttons).toBeTruthy()
  expect(buttons[0].text()).toBe('Ajouter')
  expect(table.element.innerHTML).toContain('Nom')
  expect(table.element.innerHTML).toContain('Prénom')
  expect(table.element.innerHTML).toContain('Identifiant')
  expect(table.element.innerHTML).toContain('Profil(s)')
  expect(table.element.innerHTML).toContain('Actions')
  expect(table.element.innerHTML).toContain('Utilisateurs par page')
})
