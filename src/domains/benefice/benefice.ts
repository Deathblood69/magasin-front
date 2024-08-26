import type {Achat} from '~/domains/achat/achat'

export interface Benefice {
  course: string
  benefice: number
  achats: Achat[]
}
