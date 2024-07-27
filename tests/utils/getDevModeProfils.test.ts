// getDevModeProfils.test.js
import {describe, expect, test} from 'vitest'
import {getDevModeProfils} from '../../src/utils/getDevModeProfils'

describe('Tests de getDevModeProfils', () => {
  test('Cas Nominal', () => {
    const profils = getDevModeProfils()
    expect(profils.length).toBe(4)
  })
})
