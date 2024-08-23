import type {Achat} from '~/domains/achat/achat'

/**
 * Valeur par défaut d'un utilisateur dans un formulaire
 */
export const DEFAULT_ACHAT: Omit<Achat, 'id'> = {
  course: '',
  produit: '',
  prix: 0,
  stock: 0
}
