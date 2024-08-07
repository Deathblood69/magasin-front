import type {Utilisateur} from '~/domains/utilisateur/utilisateur'

/**
 * Valeur par défaut d'un utilisateur dans un formulaire
 */
export const DEFAULT_UTILISATEUR = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  roles: [],
  disabled: false,
  isLocked: false,
  dateLocked: 0,
  loginAttempts: 0
} satisfies Omit<Utilisateur, 'id'>
