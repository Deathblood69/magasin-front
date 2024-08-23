import type {AbstractEntity} from '~/types/entity'

export interface Achat extends AbstractEntity {
  course: string
  produit: string
  prix: number
  stock: number
}
