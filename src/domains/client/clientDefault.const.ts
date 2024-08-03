import type {Client} from '~/domains/client/client'

/**
 * Valeur par défaut d'un utilisateur dans un formulaire
 */
export const DEFAULT_CLIENT_CONSTANTS: Omit<Client, 'id'> = {
  identifiant: '',
  nom: '',
  prenom: '',
  solde: ''
} satisfies Omit<Client, 'id'>
