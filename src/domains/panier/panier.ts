import type {Produit} from '~/domains/produits/produit'

export interface ItemPanier {
  produit: Produit
  quantite: number
}
