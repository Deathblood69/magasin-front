import type {AppDataTableHeaders} from '~/types/headers'

export const utilisateurHeaders: AppDataTableHeaders = [
  {title: 'Nom', key: 'lastName', align: 'start'},
  {title: 'Prénom', key: 'firstName', align: 'start'},
  {title: 'Identifiant', key: 'username', align: 'start'},
  {title: 'Profil(s)', key: 'roles', align: 'start'},
  {title: 'Actions', key: 'actions', align: 'start', sortable: false}
]
