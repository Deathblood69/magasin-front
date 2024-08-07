import type {UseFetchOptions} from '#app'

/**
 * Surcouche de la méthode useFetch de Nuxt. Permet de faire un fetch sur une API.
 * @param url
 * @param options
 */
export function useFetchService<R>(
  url: string | (() => string),
  options: UseFetchOptions<R> = {}
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch
  })
}
