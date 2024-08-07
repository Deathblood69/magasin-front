import {defineStore} from 'pinia'
import type {Client} from '../client/client'
import {PATHS_API} from '~/constants/pathsAPI.const'
import {useSoldeStore} from '~/domains/panier/solde.store'

export const useClientStore = defineStore('client', () => {
  const {retirerQuantiteSolde} = useSoldeStore()

  const selectedClient = ref<string>()

  const clientsLength = ref<number>(0)

  const {data: clients, refresh} = useFetchService<Client[]>(PATHS_API.client)

  async function debiterClient(quantite: number) {
    if (selectedClient.value && quantite) {
      const soldeId = clients.value?.find(
        (client) => client.identifiant === selectedClient.value
      )?.solde
      if (soldeId) {
        await retirerQuantiteSolde(soldeId, quantite)
      }
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
