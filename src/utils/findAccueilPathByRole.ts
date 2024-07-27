import {ROLES} from '~/constants/roles.const'
import {PAGES} from '~/constants/pages.const'

/**
 * Find the accueil path based on the roles provided.
 *
 * @param {string[] | null} roles - The roles to check for.
 * @return {string} The path based on the roles.
 */
export function findAccueilPathByRole(roles: string[] | null = null) {
  let page = PAGES.connexion.path
  if (roles === null) {
    page = PAGES.connexion.path
  } else if (roles.includes(ROLES.ADMINISTRATEUR.value)) {
    page = PAGES.utilisateurs.path
  } else if (roles.includes(ROLES.ENROLEUR.value)) {
    page = PAGES.residents.path
  } else if (roles.includes(ROLES.OPERATEUR.value)) {
    page = PAGES.videoSurveillance.path
  }

  return page
}
