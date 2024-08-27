import type {AbstractEntity} from '~/types/entity'

export interface Produit extends AbstractEntity {
  nom: string
  typeProduit: string
}
