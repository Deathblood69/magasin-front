import {describe, expect, test} from 'vitest'
import {findAccueilPathByRole} from '~/utils/findAccueilPathByRole'

describe('Tests de findAcceuilPathByRole', () => {
  test('Rôle ADMINISTRATEUR ', () => {
    const path = findAccueilPathByRole(['ADMINISTRATEUR'])
    expect(path).toBe('/utilisateurs')
  })
  test('Rôle OPERATEUR', () => {
    const path = findAccueilPathByRole(['OPERATEUR'])
    expect(path).toBe('/video-surveillance')
  })
  test('Rôle ENROLEUR', () => {
    const path = findAccueilPathByRole(['ENROLEUR'])
    expect(path).toBe('/residents')
  })
  test('Pas de Rôle', () => {
    const path = findAccueilPathByRole([])
    expect(path).toBe('/connexion')
  })
})
