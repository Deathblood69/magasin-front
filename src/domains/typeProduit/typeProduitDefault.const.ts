import type {TypeProduit} from '~/domains/typeProduit/typeProduit'

/**
 * Valeur par défaut d'un utilisateur dans un formulaire
 */
export const DEFAULT_TYPE_PRODUIT: Omit<TypeProduit, 'id'> = {
  nom: ''
}
