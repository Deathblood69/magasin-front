import type {AppDataTableHeaders} from '~/types/headers'

export const panierHeaders: AppDataTableHeaders = [
  {title: 'Produit', key: 'catalogue.nom', align: 'start'},
  {title: 'Quantité', key: 'stock', align: 'start'},
  {title: 'Prix unitaire', key: 'catalogue.prix', align: 'start'},
  {title: 'Prix total', key: 'total', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'start', sortable: false}
]
