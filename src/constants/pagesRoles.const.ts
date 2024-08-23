import {ROLES} from '~/constants/roles.const'
import {PAGES} from '~/constants/pages.const'

export const PAGES_ROLES = {
  accueil: {path: PAGES.accueil, roles: []},
  connexion: {path: PAGES.connexion, roles: []},
  administration: {
    path: PAGES.administration,
    roles: [ROLES.ADMINISTRATEUR.value]
  },
  courses: {
    path: PAGES.courses,
    roles: [ROLES.ADMINISTRATEUR.value]
  },
  clients: {
    path: PAGES.clients,
    roles: [ROLES.ADMINISTRATEUR.value]
  },
  produits: {
    path: PAGES.produits,
    roles: [ROLES.ADMINISTRATEUR.value]
  },
  typeProduits: {
    path: PAGES.typeProduits,
    roles: [ROLES.ADMINISTRATEUR.value]
  },
  utilisateurs: {
    path: PAGES.utilisateurs,
    roles: [ROLES.ADMINISTRATEUR.value]
  }
}
