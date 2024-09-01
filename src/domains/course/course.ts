import type {AbstractEntity} from '~/types/entity'

export interface Course extends AbstractEntity {
  nom: string
  date: Date
}
