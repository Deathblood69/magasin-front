import type {AppDataTableHeaders} from '~/types/headers'

/**
 * Permet de lister les colonnes du tableau.
 */
export const DATATABLE_HEADERS = {
  client: [
    {title: 'Nom', key: 'nom', align: 'start'},
    {title: 'Prénom', key: 'prenom', align: 'start'},
    {title: 'Solde', key: 'solde', align: 'start'},
    {title: 'Actions', key: 'actions', align: 'start', sortable: false}
  ] satisfies AppDataTableHeaders,
  panier: [
    {title: 'Produit', key: 'produit.nom', align: 'start'},
    {title: 'Quantité', key: 'quantite', align: 'start'},
    {title: 'Prix unitaire', key: 'prix', align: 'start'},
    {title: 'Prix total', key: 'total', align: 'start'},
    {title: 'Actions', key: 'actions', align: 'start', sortable: false}
  ] satisfies AppDataTableHeaders,
  produit: [
    {title: 'Nom', key: 'nom', align: 'start'},
    {title: 'Photo', key: 'photo', align: 'start'},
    {title: 'Prix', key: 'prix', align: 'start'},
    {title: 'Stock', key: 'stock', align: 'start'},
    {title: 'Type Produit', key: 'typeProduit', align: 'start'},
    {title: 'Actions', key: 'actions', align: 'start', sortable: false}
  ] satisfies AppDataTableHeaders,
  user: [
    {title: 'Nom', key: 'lastName', align: 'start'},
    {title: 'Prénom', key: 'firstName', align: 'start'},
    {title: 'Identifiant', key: 'username', align: 'start'},
    {title: 'Profil(s)', key: 'roles', align: 'start'},
    {title: 'Actions', key: 'actions', align: 'start', sortable: false}
  ] satisfies AppDataTableHeaders
}
