import type {AppDataTableHeaders} from '~/types/headers'

export const produitHeaders: AppDataTableHeaders = [
  {title: 'Nom', key: 'nom', align: 'start'},
  {title: 'Photo', key: 'photo', align: 'start'},
  {title: 'Prix', key: 'prix', align: 'start'},
  {title: 'Stock', key: 'stock', align: 'start'},
  {title: 'Type Produit', key: 'typeProduit', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'start', sortable: false}
]
