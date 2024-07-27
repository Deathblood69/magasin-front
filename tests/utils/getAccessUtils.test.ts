// getAccessUtils.test.js
import {describe, expect, test} from 'vitest'
import {getAccessUtils} from '../../src/utils/getAccessUtils'

describe('Tests de getAccessUtils', () => {
  test("Cas d'une autorisation", () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayInMS = yesterday.getTime().toString()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowInMS = tomorrow.getTime().toString()
    const accessUtils = getAccessUtils(true, {
      startDate: yesterdayInMS,
      endDate: tomorrowInMS,
    })

    expect(accessUtils.icon).toBe('mdi-account-lock-open')
    expect(accessUtils.color).toBe('success')
    expect(accessUtils.text).toBe('Autorisé')
  })
  test("Cas d'une expiration", () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 10)
    const yesterdayInMS = yesterday.getTime().toString()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() - 5)
    const tomorrowInMS = tomorrow.getTime().toString()
    const accessUtils = getAccessUtils(true, {
      startDate: yesterdayInMS,
      endDate: tomorrowInMS,
    })

    expect(accessUtils.icon).toBe('mdi-account-clock')
    expect(accessUtils.color).toBe('warning')
    expect(accessUtils.text).toBe('Connu')
  })

  test("Cas d'une interdiction", () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 10)
    const yesterdayInMS = yesterday.getTime().toString()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 5)
    const tomorrowInMS = tomorrow.getTime().toString()
    const accessUtils = getAccessUtils(false, {
      startDate: yesterdayInMS,
      endDate: tomorrowInMS,
    })

    expect(accessUtils.icon).toBe('mdi-account-lock')
    expect(accessUtils.color).toBe('error')
    expect(accessUtils.text).toBe('Non-autorisé')
  })
})
