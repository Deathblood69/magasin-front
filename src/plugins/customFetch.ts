import {PAGES} from '~/constants/pages.const'

export default defineNuxtPlugin(() => {
  const $customFetch = $fetch.create({
    baseURL: '/api',
    onResponseError: async ({response}) => {
      const router = useRouter()
      const route = useRoute()
      if (response.status === 401 && route.path !== PAGES.connexion.path) {
        /*
         * If the user is not authenticated, redirect to the login page.
         * Attention ! utiliser useRouter() évite une boucle infinie
         */
        await router.push({path: '/'})
      }
    }
  })
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch
    }
  }
})
