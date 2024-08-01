import type {EntityInterface} from '~/types/entity'

export interface Client extends EntityInterface {
  identifiant: string
  nom: string
  prenom: string
  solde: string
}
