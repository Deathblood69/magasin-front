import {expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import AuthLoginBtn from '~/domains/auth/AuthLoginBtn.vue'
import {vuetify} from '~/plugins/vuetify'

test('Affichage de AuthLoginBtn', () => {
  const wrapper = mount(AuthLoginBtn, {
    props: {},
    global: {
      plugins: [vuetify],
    },
  })
  expect(wrapper).toBeDefined()
})
