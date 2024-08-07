import {defineStore} from 'pinia'
import type {Utilisateur} from '~/domains/utilisateur/utilisateur'
import {PATHS_API} from '~/constants/pathsAPI.const'

export const useUserStore = defineStore('user', () => {
  const selectedUser = ref<Utilisateur>()

  const usersLength = ref<number>(0)

  const {data: users, refresh} = useFetchService<Utilisateur[]>(
    PATHS_API.utilisateur
  )

  return {selectedUser, users, usersLength, refresh}
})
