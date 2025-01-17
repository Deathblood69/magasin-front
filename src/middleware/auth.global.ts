import {useAuthStore} from '~/stores/auth.store'
import {PAGES_ROLES} from '~/constants/pagesRoles.const'
import {PAGES} from '~/constants/pages.const'

/**
 * Check if authenticated and authorized
 */
export default defineNuxtRouteMiddleware(async (to, _from) => {
  const {openSnackbar} = useSnackbarStore()

  // Check if authenticated
  const authStore = useAuthStore()
  const authentified = await authStore.isAuthenticated()
  if (!authentified && to.path !== PAGES.connexion) {
    return navigateTo(PAGES.connexion)
  }

  // Check if authorized
  const pageRole = Object.values(PAGES_ROLES).find(
    (e) => e.path === to.path
  )?.roles
  const userRole = authStore.user?.roles

  if (pageRole?.length === 0) {
    return true
  } else if (userRole?.length === 0) {
    openSnackbar("Vous n'avez pas l'accès à l'application", {
      color: 'error',
      timeout: 5000
    })
    return navigateTo(PAGES.connexion)
  } else if (!pageRole?.some((e) => userRole?.includes(e))) {
    openSnackbar("Vous n'avez pas les droits pour accéder à cette page", {
      color: 'error',
      timeout: 5000
    })
    return navigateTo(PAGES.accueil)
  }
})
