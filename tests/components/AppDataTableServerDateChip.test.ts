import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import AppDataTableServerDateChip from '../../src/components/AppDataTableServerDateChip.vue'
import {vuetify} from '../../src/plugins/vuetify'

describe('Tests de AppDataTableServerDateChip', () => {
  test('Cas nominal', () => {
    const wrapper = mount(AppDataTableServerDateChip, {
      props: {
        date: '2022-01-01',
      },
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper).toBeDefined()
  })
  test('Format de date invalide', () => {
    const wrapper = mount(AppDataTableServerDateChip, {
      props: {
        date: 'date_invalide',
      },
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('Invalid Date')
  })
  test('Format de date invalide', () => {
    const wrapper = mount(AppDataTableServerDateChip, {
      props: {},
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper).toBeDefined()
  })
})
