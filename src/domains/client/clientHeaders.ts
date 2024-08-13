import type {AppDataTableHeaders} from '~/types/headers'

export const clientHeaders: AppDataTableHeaders = [
  {title: 'Nom', key: 'nom', align: 'start'},
  {title: 'Prénom', key: 'prenom', align: 'start'},
  {title: 'Solde', key: 'solde', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'start', sortable: false}
]
