import type {AbstractEntity} from '~/types/entity'

export interface Client extends AbstractEntity {
  nom: string
  prenom: string
  solde: number
}
