import type {EntityInterface} from '~/types/entity'

export interface Produit extends EntityInterface {
  nom: string
  photo: string
  prix: number
  stock: number
  typeProduit: string
}
