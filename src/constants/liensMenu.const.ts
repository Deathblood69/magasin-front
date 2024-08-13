import type {LienMenuInterface} from '~/types/lienMenu'
import {PAGES} from '~/constants/pages.const'

/**
 * Liens du menu de navigation de l'application.
 */
export const LIENS_MENU: LienMenuInterface[] = [
  {
    to: PAGES.administration,
    title: 'tableauDeBord',
    icon: 'mdi-view-dashboard'
  },
  {
    to: PAGES.clients,
    title: 'clients',
    icon: 'mdi-account-cash'
  },
  {
    to: PAGES.produits,
    title: 'produits',
    icon: 'mdi-store'
  },
  {
    to: PAGES.typeProduits,
    title: 'typeProduit',
    icon: 'mdi-store-cog'
  },
  {
    to: PAGES.utilisateurs,
    title: 'utilisateurs',
    icon: 'mdi-account-multiple'
  }
]
