import type {Catalogue} from '~/domains/catalogue/catalogue'

export interface ItemPanier {
  catalogue: Catalogue
  stock: number
}
