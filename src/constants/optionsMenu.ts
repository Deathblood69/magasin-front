import {PAGES} from '~/constants/pages.const'

/**
 * Liens du menu de navigation de l'application.
 */
export const OPTIONS_MENU = {
  tableauDeBord: {
    to: PAGES.administration.path,
    title: 'tableauDeBord',
    icon: 'mdi-view-dashboard'
  },
  clients: {
    to: PAGES.clients.path,
    title: 'clients',
    icon: 'mdi-account-cash'
  },
  produits: {
    to: PAGES.produits.path,
    title: 'produits',
    icon: 'mdi-shopping'
  },
  utilisateurs: {
    to: PAGES.utilisateurs.path,
    title: 'utilisateurs',
    icon: 'mdi-account-multiple'
  }
}
