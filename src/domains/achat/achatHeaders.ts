import type {AppDataTableHeaders} from '~/types/headers'

export const achatHeaders: AppDataTableHeaders = [
  {title: 'Nom', key: 'produit', align: 'start'},
  {title: 'Stock', key: 'stock', align: 'start'},
  {title: 'Prix', key: 'prix', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'start', sortable: false}
]
