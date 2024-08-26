import type {AppDataTableHeaders} from '~/types/headers'

export const courseHeaders: AppDataTableHeaders = [
  {title: 'Nom', key: 'nom', align: 'start'},
  {title: 'Bénéfices', key: 'benefice', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'start', sortable: false}
]
