import {defineStore} from 'pinia'
import type {Client} from './client'
import {PATHS_API} from '~/constants/pathsAPI.const'
import {METHODE_HTTP} from '~/constants/methodeHTTP.const'
import type {Solde} from '~/domains/clients/solde'

export const useClientStore = defineStore('client', () => {
  const selectedClient = ref<string>()

  const clientsLength = ref<number>(0)

  const {data: clients, refresh} = useFetchService<Client[]>(PATHS_API.client)

  async function debiterClient(quantite: number) {
    if (selectedClient.value && quantite) {
      const soldeId = clients.value?.find(
        (client) => client.identifiant === selectedClient.value
      )?.solde

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
      await refresh()
    }
  }

  return {
    selectedClient,
    clients,
    clientsLength,
    refresh,
    debiterClient
  }
})
