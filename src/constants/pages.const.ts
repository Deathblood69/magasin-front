import {ROLES} from '~/constants/roles.const'

export const PAGES = {
  accueil: {path: '/', roles: []},
  connexion: {path: '/connexion', roles: []},
  administration: {
    path: '/administration',
    roles: [ROLES.ADMINISTRATEUR.value],
  },
  utilisateurs: {
    path: '/administration/utilisateurs',
    roles: [ROLES.ADMINISTRATEUR.value],
  },
}
