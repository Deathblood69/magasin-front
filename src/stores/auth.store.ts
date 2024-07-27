import {defineStore} from 'pinia'
import {useFetchService} from '~/composables/useFetchService'
import type {CredentialsInterface} from '~/types/credentials'
import {PATHS_API} from '~/constants/pathsAPI.const'
import {METHODE_HTTP} from '~/constants/methodeHTTP.const'
import type {UserInterface} from '~/types/user'
import type {TokenInterface} from "~/types/token";

export const useAuthStore = defineStore('auth', () => {
  const credentials = ref<CredentialsInterface>({
    username: '',
    password: '',
  })

  const user = computed(() => {
      if(!userToken?.value) return null
      const rs:Partial<UserInterface> = {
          username: userToken.value?.username,
          roles : userToken.value?.roles
      }
      return rs
  })

  const {
    data: userToken,
    status,
    error,
    pending,
    refresh,
  } = useFetchService<TokenInterface>(PATHS_API.login, {
    method: METHODE_HTTP.POST,
    body: credentials,
    immediate: false,
  })

  /**
   * Vérifie si l'utilisateur est authentifié.
   * @returns {Promise<boolean>} - Vrai si l'utilisateur est authentifié, faux sinon.
   */
  async function isAuthenticated() {

    // Si l'utilisateur est null alors on essaie de récupérer les données de l'utilisateur
    if ( userToken?.value == null) {
      const {data: newUser} = await useFetchService<TokenInterface>(
        PATHS_API.refreshAuth,
        {
          method: METHODE_HTTP.POST,
          immediate: true,
        },
      )
      userToken.value = newUser.value
    }

    return userToken.value !== null
  }

  /**
   * Déconnecte l'utilisateur en envoyant une requête à l'API de déconnexion.
   */
  async function logOut() {
    await useFetchService(PATHS_API.logout)
  }

  /**
   * Tente de se connecter avec de nouvelles informations d'identification.
   *
   * @param newCredentials Les nouvelles informations d'identification.
   * @returns Un booléen indiquant si la connexion a réussi.
   */
  async function tryLogin(newCredentials: CredentialsInterface) {
    credentials.value = {...newCredentials}
    const newUser = await refresh()
    return newUser !== null
  }

  return {
    status,
    error,
    pending,
    logOut,
    user,
    credentials,
    isAuthenticated,
    tryLogin,
  }
})
