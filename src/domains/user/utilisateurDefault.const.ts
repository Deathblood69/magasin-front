import type {UserInterface} from '~/types/user'

/**
 * Valeur par défaut d'un utilisateur dans un formulaire
 */
export const DEFAULT_USER_CONSTANTS = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  roles: [],
  disabled: false,
  isLocked: false,
  dateLocked: 0,
  loginAttempts: 0
} satisfies Omit<UserInterface, 'id'>
