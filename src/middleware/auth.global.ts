import {useAuthStore} from '~/stores/auth.store'
import {PAGES} from '~/constants/pages.const'

/**
 * Check if authenticated and authorized
 */
export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Check if authenticated
  const authStore = useAuthStore()
  const authentified = await authStore.isAuthenticated()
  if (!authentified && to.path !== PAGES.connexion.path) {
    return navigateTo(PAGES.connexion.path)
  }

  // Check if authorized
  const pageRole = PAGES[to.name as keyof typeof PAGES]?.roles
  if (pageRole?.length > 0 && to.path !== PAGES.connexion.path) {
    const roles = authStore.user?.roles

    const requiredRole = pageRole?.some((role) =>
      roles?.some((r) => r === role),
    )
    if (!requiredRole) {
      return navigateTo(PAGES.connexion.path)
    }
  }
})
