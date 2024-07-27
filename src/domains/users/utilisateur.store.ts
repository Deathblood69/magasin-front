import {defineStore} from 'pinia'
import type {UserInterface} from '~/types/user'
import {PATHS_API} from '~/constants/pathsAPI.const'

export const useUserStore = defineStore('user', () => {
  const config = useRuntimeConfig()

  const selectedUser = ref<UserInterface>()

  const usersLength = ref<number>(0)

  const {data: users, refresh} = useFetch<UserInterface[]>(PATHS_API.user, {
    baseURL: config.public.NUXT_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    watch: false,
    immediate: false,
  })

  onMounted(async () => {
    await refreshTable()
  })

  async function refreshTable() {
    await refresh()
  }

  return {selectedUser, users, usersLength, refreshTable}
})
