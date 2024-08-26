import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import AuthLogin from '~/auth/AuthLogin.vue'
import type {CredentialsInterface} from '~/types/credentials'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AppTextFieldPassword from '~/components/AppTextFieldPassword.vue'
import AuthLoginBtn from '~/auth/AuthLoginBtn.vue'

const vuetify = createVuetify({
  components,
  directives
})

const credentials: CredentialsInterface = {
  username: '',
  password: ''
}
const wrapper = mount(AuthLogin, {
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

//Le bouton de connexion
const connectBtn = wrapper.findComponent(AuthLoginBtn)

describe('Affichage de AuthLogin', () => {
  test('Vérification du texte existant', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toContain('Person Of Interest - BALARD')
    expect(wrapper.text()).toContain('Identifiant')
    expect(wrapper.text()).toContain('Mot de passe')
  })
})

describe('Saisies des identifiants et envoi du formulaire', () => {
  test('Saisie des identifiants', async () => {
    //Saisie
    credentials.username = 'd.dev'
    credentials.password = 'dev'

    await TFident.setValue(credentials.username)
    await TFpassw.setValue(credentials.password)

    //Vérification des identifiants
    expect(TFidentInput.value).toEqual('d.dev')
    expect(TFpasswInput.value).toEqual('dev')
  })

  test('Clic du bouton connexion', () => {
    connectBtn.trigger('click')
    expect(wrapper.emitted('connect'))
  })
})

describe('Saisies invalides des identifiants', () => {
  test('Saisie des identifiants', async () => {
    //Saisie
    credentials.username = 'd.dev'
    credentials.password = 'azerty'

    await TFident.setValue(credentials.username)
    await TFpassw.setValue(credentials.password)

    //Vérification des identifiants
    expect(TFidentInput.value).toEqual('d.dev')
    expect(TFpasswInput.value).toEqual('azerty')
  })

  test('Clic du bouton connexion', () => {
    connectBtn.trigger('click')
    expect(wrapper.emitted('connect'))
  })

  test("Affichage du message d'erreur", () => {
    expect(wrapper.html()).toContain(
      'Veuillez saisir des identifiants valides svp.'
    )
  })
})

describe('Tentative de connexion échouée au bout de 5 fois', () => {
  test('Saisie des identifiants', async () => {
    //Saisie
    credentials.username = 'd.dev'
    credentials.password = 'azerty'

    await TFident.setValue(credentials.username)
    await TFpassw.setValue(credentials.password)

    //Vérification des identifiants
    expect(TFidentInput.value).toEqual('d.dev')
    expect(TFpasswInput.value).toEqual('azerty')
  })

  test('Clic du bouton connexion', () => {
    connectBtn.trigger('click')
    expect(wrapper.emitted('connect'))
  })

  test("Affichage du message d'erreur pour chaque tentative échouée", () => {
    //le compteur de tentative
    let compteur = 0

    /** Si le mot de passe est incorrecte et que l'utilisateur clique sur le bouton de connexion, affiche un message d'erreur.
     * Si le mot de passe est incorrecte 5 fois d'affilée, affiche un message d'erreur de blocage de compte */
    while (compteur < 5) {
      compteur++
      connectBtn.trigger('click')
      expect(wrapper.emitted('connect'))
      expect(wrapper.html()).toContain(
        'Veuillez saisir des identifiants valides svp.'
      )
    }
    //  TODO: WIP car pas de back connecté (on ne reçoit pas d'erreur de l'API)
    // Après 5 tentatives, le compte doit être bloqué
    // expect(wrapper.html()).toContain(
    //   'Votre compte est bloqué !  Veuillez réessayer dans 20 minutes.',
    // )
  })
})
