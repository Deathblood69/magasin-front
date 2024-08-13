import {ROLES} from '~/constants/roles.const'
import {PAGES} from '~/constants/pages.const'

/**
 * Find the accueil path based on the roles provided.
 *
 * @param {string[] | null} roles - The roles to check for.
 * @return {string} The path based on the roles.
 */
export function findAccueilPathByRole(roles: string[] | null = null) {
  let page = PAGES.connexion
  if (roles === null) {
    page = PAGES.connexion
  } else if (roles.includes(ROLES.ADMINISTRATEUR.value)) {
    page = PAGES.administration
  } else if (roles.includes(ROLES.UTILISATEUR.value)) {
    page = PAGES.accueil
  }
  return page
}
