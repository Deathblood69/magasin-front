import {useFetchService} from '~/composables/useFetchService'

export const useEntityStore = <EntityType>(entity: string) =>
  defineStore(`${entity}-generic-store`, () => {
    const config = useRuntimeConfig()

    const lastFetchTime = ref(0)

    const selected = ref<EntityType>()

    const length = computed(() => {
      return 0
    })

    /** Init Fetch refs for entity */
    const {
      data,
      refresh: forceRefresh,
      error
    } = useFetchService<EntityType[]>(`/${entity}`, {
      onResponse(context) {
        if (!context.response.ok) lastFetchTime.value = 0
      },
      immediate: false
    })

    onBeforeMount(async () => {
      await refreshData()
    })

    /**
     * Rafraîchit les données si le temps écoulé depuis la
     * dernière récupération dépasse 10000 millisecondes.
     */
    const refreshData = async () => {
      if (
        Date.now() - lastFetchTime.value >
        parseInt(config.public.FETCH_LIST_INTERVALE)
      ) {
        await forceRefresh() // Force le rafraîchissement
        lastFetchTime.value = Date.now()
      }
    }

    return {
      data,
      length,
      selected,
      refreshData,
      forceRefresh,
      error
    }
  })()
