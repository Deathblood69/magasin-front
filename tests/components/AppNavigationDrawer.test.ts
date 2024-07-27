import {afterEach, describe, expect, test, vi} from 'vitest'
import {shallowMount, VueWrapper} from '@vue/test-utils'
import AppNavigationDrawer from '../../src/components/AppNavigationDrawer.vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import {VLayout} from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type {ComponentPublicInstance} from 'vue'

const vuetify = createVuetify({
  components,
  directives,
})

type ComponentProps = any
type ComponentVariables = {
  modelValue: boolean
  computedDrawerVisible: boolean
  deconnexion: () => Promise<void>
}

type ComponentType = VueWrapper<
  ComponentPublicInstance<ComponentProps, ComponentVariables>
>

describe('Tests de AppNavigationDrawer', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('AppNavigationDrawer est défini', () => {
    const wrapper: ComponentType = shallowMount(AppNavigationDrawer, {
      props: {modelValue: true, liens: [], temporary: false},
      parentComponent: VLayout,
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper).toBeDefined()
  })

  test('Emit fonctionnel', () => {
    const wrapper: ComponentType = shallowMount(AppNavigationDrawer, {
      props: {modelValue: true, liens: [], temporary: false},
      parentComponent: VLayout,
      global: {
        plugins: [vuetify],
      },
    })
    wrapper.vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[true]])
  })

  test('Props mis à jour', async () => {
    const wrapper: ComponentType = shallowMount(AppNavigationDrawer, {
      props: {modelValue: true, liens: [], temporary: false},
      parentComponent: VLayout,
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.vm.computedDrawerVisible).toBe(true)
    await wrapper.setProps({modelValue: false})
    expect(wrapper.vm.computedDrawerVisible).toBe(false)
  })

  // TODO reimplémenter le test
/*  test('Déconnexion', async () => {
    vi.spyOn(useRouter(), 'push') // mock method push

    const wrapper: ComponentType = shallowMount(AppNavigationDrawer, {
      props: {modelValue: true, liens: []},
      parentComponent: VLayout,
      global: {
        plugins: [vuetify],
      },
    })

    const authStore = useAuthStore()
    authStore.decodedToken = {
      username: 'test',
      roles: [],
      iat: 0,
      exp: 0,
    }
    vi.spyOn(authStore, 'logOut')

    expect(authStore.decodedToken).not.toBeNull()
    await wrapper.vm.deconnexion()
    expect(authStore.logOut).toHaveBeenCalled()
    expect(useRouter().push).toHaveBeenCalledWith(APP_LINKS.connexion)
    expect(authStore.decodedToken).toBeNull()
  })*/
})
