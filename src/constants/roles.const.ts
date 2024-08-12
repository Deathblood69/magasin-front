import type {RoleInterface} from '~/types/role'

export const ROLES: Record<string, RoleInterface> = {
  ADMINISTRATEUR: {
    title: 'Administrateur',
    description: 'Administrateur du système',
    value: 'ADMINISTRATEUR'
  },
  UTILISATEUR: {
    title: 'Utilisateur',
    description: 'Utilisateur du système',
    value: 'UTILISATEUR'
  }
}
