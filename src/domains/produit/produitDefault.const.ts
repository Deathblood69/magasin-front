import type {Produit} from '~/domains/produit/produit'

/**
 * Valeur par défaut d'un utilisateur dans un formulaire
 */
export const DEFAULT_PRODUIT: Omit<Produit, 'id'> = {
  nom: '',
  stock: 0,
  prix: 0,
  typeProduit: ''
}
