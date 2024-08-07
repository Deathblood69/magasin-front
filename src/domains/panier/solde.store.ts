import {defineStore} from 'pinia'
import {PATHS_API} from '~/constants/pathsAPI.const'
import type {Solde} from '~/domains/solde/solde'
import {METHODE_HTTP} from '~/constants/methodeHTTP.const'

export const useSoldeStore = defineStore('solde', () => {
  const selectedSolde = ref<Solde>()

  const soldesLength = ref<number>(0)

  const {data: soldes, refresh} = useFetchService<Solde[]>(PATHS_API.solde)

  async function retirerQuantiteSolde(soldeId: string, quantite: number) {
    const {data: solde} = await useFetchService<Solde>(
      `${PATHS_API.solde}/${soldeId}/id`,
      {
        method: METHODE_HTTP.GET
      }
    )

    if (solde.value) {
      await useFetchService<Solde[]>(
        `${PATHS_API.solde}/${solde.value?.id}/id`,
        {
          method: METHODE_HTTP.PATCH,
          body: {
            valeur: solde.value.valeur - quantite
          }
        }
      )
    }
  }

  return {selectedSolde, soldes, soldesLength, retirerQuantiteSolde, refresh}
})
