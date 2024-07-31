import {PATHS_API} from '~/constants/pathsAPI.const'
import type {Ref} from 'vue'

/**
 * Fonction qui surcouche le composable useFetch
 * @param path Chemin vers l'api du backend
 * @param options Objet contenant les options useFetch
 */
export function useFetchService<E>(
  path: PATHS_API | Ref<string> | string,
  options?: any
) {
  const config = useRuntimeConfig()
  return useFetch<E>(path, {
    baseURL: config.public.NUXT_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    watch: false,
    ...options
  })
}
