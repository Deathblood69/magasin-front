import type {AppDataTableHeaders} from '~/types/headers'

export const utilisateurHeaders: AppDataTableHeaders = [
  {title: 'Nom', key: 'nom', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'start', sortable: false}
]
