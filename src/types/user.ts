import type {EntityInterface} from '~/types/entity'

export interface UserInterface extends EntityInterface {
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
