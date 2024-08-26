import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import FormCredentials from '~/auth/FormCredentials.vue'
import type {CredentialsInterface} from '~/types/credentials'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AppTextFieldPassword from '~/components/AppTextFieldPassword.vue'

const vuetify = createVuetify({
  components,
  directives
})

const credentials: CredentialsInterface = {
  username: '',
  password: ''
}

const wrapper = mount(FormCredentials, {
  props: {
    modelValue: credentials
  },
  global: {
    plugins: [vuetify]
  }
})

//Les textfields (Identifiant et Mot de passe)
const TFident = wrapper.findComponent(components.VTextField)
const TFpassw = wrapper.findComponent(AppTextFieldPassword)

//Les inputs des textFields (Identifiant et Mot de passe)
const TFidentInput = TFident.vm.$el.querySelector('input')
const TFpasswInput = TFpassw.vm.$el.querySelector('input')

test('Affichage des champs et labels identifiant et mot de passe', () => {
  //Les textfields (Identifiant et Mot de passe)
  const textFields = wrapper.findAllComponents(components.VTextField)

  //Les labels des textFields (Identifiant et Mot de passe)
  const TFidentLabel = TFident.vm.$el.querySelector('label').textContent
  const TFpasswLabel = TFpassw.vm.$el.querySelector('label').textContent

  //Vérification des labels
  expect(TFidentLabel).toBe('Identifiant')
  expect(TFpasswLabel).toBe('Mot de passe')
  expect(textFields.length).toBe(2)
})

test('Tests des inputs', () => {
  //Saisie
  credentials.username = 'd.dev'
  credentials.password = 'dev'
  TFidentInput.value = credentials.username
  TFpasswInput.value = credentials.password

  //Vérification des identifiants
  expect(TFidentInput.value).toEqual('d.dev')
  expect(TFpasswInput.value).toEqual('dev')
})

describe('Tests des erreurs du champ identifiant', () => {
  test("Message d'erreur à la perte du focus du champ identifiant", async () => {
    await TFident.trigger('focus')
    await TFident.setValue('test')
    await TFident.setValue('')
    await TFident.trigger('blur')
    expect(wrapper.find('.v-messages__message').text()).toEqual(
      'Ce champ est requis !'
    )
  })

  test("Pas de message d'erreur à la perte du focus du champ identifiant", async () => {
    await TFident.trigger('focus')
    await TFident.setValue('d.dev')
    await TFident.trigger('blur')
    expect(TFidentInput.value).toEqual('d.dev')

    expect(wrapper.find('.v-messages__message').exists()).toBe(false)
  })
})

describe('Tests des erreurs du champ mot de passe', () => {
  test("Message d'erreur à la perte du focus du champ mot de passe", async () => {
    await TFpassw.trigger('focus')
    await TFpassw.setValue('test')
    await TFpassw.setValue('')
    await TFpassw.trigger('blur')
    expect(wrapper.find('.v-messages__message').text()).toEqual(
      'Ce champ est requis !'
    )
  })

  test("Pas de message d'erreur à la perte du focus du champ mot de passe", async () => {
    await TFpassw.trigger('focus')
    await TFpassw.setValue('dev')
    await TFpassw.trigger('blur')
    expect(TFpasswInput.value).toEqual('dev')
    expect(wrapper.find('.v-messages__message').exists()).toBe(false)
  })
})
