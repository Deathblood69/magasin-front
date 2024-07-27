import {useSnackbarStore} from '~/stores/snackbar.store'
import type {FetchServiceResponse} from '~/types/fetchServiceResponse'

export const getLastProfilError = (
  context: FetchServiceResponse,
  update: boolean,
) => {
  const {openSnackbar} = useSnackbarStore()
  const messageErreur = Object(context.response._data).message
  const lastRole = messageErreur.split('_')[3].toUpperCase()
  // Affiche une notification d'erreur en affichant le profil
  openSnackbar(
    `Cet utilisateur est le dernier ${lastRole} existant.<br/> Vous ne pouvez pas ${update ? 'modifier' : 'supprimer'} ce dernier, veuillez d'abord attribuer le profil ${lastRole} à un autre utilisateur.`,
    {color: 'error', timeout: 5000},
  )
}
