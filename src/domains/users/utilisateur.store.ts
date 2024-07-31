import {defineStore} from 'pinia'
import type {UserInterface} from '~/types/user'
import {PATHS_API} from '~/constants/pathsAPI.const'

export const useUserStore = defineStore('user', () => {
  const selectedUser = ref<UserInterface>()

  const usersLength = ref<number>(0)

  const {data: users, refresh} = useFetchService<UserInterface[]>(
    PATHS_API.user
  )

  return {selectedUser, users, usersLength, refresh}
})
