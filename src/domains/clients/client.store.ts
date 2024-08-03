import {defineStore} from 'pinia'
import {PATHS_API} from '~/constants/pathsAPI.const'
import type {Client} from '~/domains/clients/client'

export const useClientStore = defineStore('client', () => {
  const selectedClient = ref<Client>()

  const clientsLength = ref<number>(0)

  const {data: clients, refresh} = useFetchService<Client[]>(PATHS_API.client)

  return {selectedClient, clients, clientsLength, refresh}
})
