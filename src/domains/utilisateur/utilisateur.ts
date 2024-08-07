import type {AbstractEntity} from '~/types/entity'

export interface Utilisateur extends AbstractEntity {
  firstName: string
  lastName: string
  username: string
  password: string
  roles: Array<string>
  disabled: boolean
  isLocked: boolean
  dateLocked: number
  loginAttempts: number
}
