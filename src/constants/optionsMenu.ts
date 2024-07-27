import {PAGES} from '~/constants/pages.const'

/**
 * Liens du menu de navigation de l'application.
 */
export const OPTIONS_MENU = {
  tableauDeBord: {
    to: PAGES.administration.path,
    title: 'tableauDeBord',
    icon: 'mdi-view-dashboard',
  },
  utilisateurs: {
    to: PAGES.utilisateurs.path,
    title: 'utilisateurs',
    icon: 'mdi-account-plus',
  },
}
