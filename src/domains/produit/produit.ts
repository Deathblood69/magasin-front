import type {AbstractEntity} from '~/types/entity'

export interface Produit extends AbstractEntity {
  nom: string
  photo: string
  prix: number
  stock: number
  typeProduit: string
}
