import type {Produit} from '~/domains/produit/produit'

export interface ItemPanier {
  produit: Produit
  quantite: number
}
