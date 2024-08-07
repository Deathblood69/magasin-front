import type {AbstractEntity} from '~/types/entity'

export interface Client extends AbstractEntity {
  identifiant: string
  nom: string
  prenom: string
  solde: string
}
