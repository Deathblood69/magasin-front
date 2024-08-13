import type {AppDataTableHeaders} from '~/types/headers'

export const typeProduitHeaders: AppDataTableHeaders = [
  {title: 'Nom', key: 'nom', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'end', sortable: false}
]
