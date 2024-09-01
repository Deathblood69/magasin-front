import type {LienMenuInterface} from '~/types/lienMenu'
import {PAGES} from '~/constants/pages.const'

/**
 * Liens du menu de navigation de l'application.
 */
export const LIENS_MENU: LienMenuInterface[] = [
  {
    to: PAGES.courses,
    title: 'Courses',
    icon: 'mdi-cart-outline'
  },
  {
    to: PAGES.clients,
    title: 'Clients',
    icon: 'mdi-account-cash'
  },
  {
    to: PAGES.produits,
    title: 'Produits',
    icon: 'mdi-store'
  },
  {
    to: PAGES.typeProduits,
    title: 'Type de produit',
    icon: 'mdi-store-cog'
  },
  {
    to: PAGES.utilisateurs,
    title: 'Utilisateurs',
    icon: 'mdi-account-multiple'
  }
]
