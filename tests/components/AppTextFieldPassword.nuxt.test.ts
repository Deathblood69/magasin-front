import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AppTextFieldPassword from '~/components/AppTextFieldPassword.vue'

const vuetify = createVuetify({
  components,
  directives,
})

const wrapper = mount(AppTextFieldPassword, {
  global: {
    plugins: [vuetify],
  },
})

//Le textfield du mot de passe
const textField = wrapper.findComponent(components.VTextField)

//L'input du mot de passe
const input = textField.vm.$el.querySelector('input')

//L'icône de visibilité du mot de passe
const passwordVisibilityIcon = textField.findComponent(components.VIcon)

test('Affichage du champ mot de passe', () => {
  expect(textField).toBeDefined()
  expect(textField.vm.$el.querySelector('label').textContent).toBe(
    'Mot de passe',
  )
})

describe('Mot de passe visible ou non', () => {
  test("Saisie d'un mot de passe", () => {
    expect(input).toBeDefined()
    input.value = 'dev'
    expect(input.value).toEqual('dev')
  })

  test("Modification de l'icône de visibilité", async () => {
    //Vérification du bon type de l'icône
    expect(passwordVisibilityIcon.classes('mdi-eye-off')).toBe(true)

    //Clic de l'icône de visibilité pour afficher le mot de passe
    await passwordVisibilityIcon.trigger('click')

    //Vérification du bon type de l'icône
    expect(passwordVisibilityIcon.classes('mdi-eye')).toBe(true)

    //Clic de l'icône de visibilité pour cacher le mot de passe
    await passwordVisibilityIcon.trigger('click')

    //Vérification du bon type de l'icône
    expect(passwordVisibilityIcon.classes('mdi-eye-off')).toBe(true)
  })

  test('Modification du type du textfield', async () => {
    //Clic de l'icône de visibilité pour afficher le mot de passe
    await passwordVisibilityIcon.trigger('click')

    //Vérification du bon type de mot de passe en type text
    expect(input.type).toBe('text')

    //Clic de l'icône de visibilité pour cacher le mot de passe
    await passwordVisibilityIcon.trigger('click')

    //Vérification du bon type de mot de passe en type password
    expect(input.type).toBe('password')
  })
})
