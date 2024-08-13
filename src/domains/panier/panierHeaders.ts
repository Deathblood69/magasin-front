import type {AppDataTableHeaders} from '~/types/headers'

export const panierHeaders: AppDataTableHeaders = [
  {title: 'Produit', key: 'produit.nom', align: 'start'},
  {title: 'Quantité', key: 'quantite', align: 'start'},
  {title: 'Prix unitaire', key: 'prix', align: 'start'},
  {title: 'Prix total', key: 'total', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'start', sortable: false}
]
