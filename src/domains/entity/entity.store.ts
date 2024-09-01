import {useFetchService} from '~/composables/useFetchService'
import {METHODE_HTTP} from '~/constants/methodeHTTP.const'
import type {AbstractEntity} from '~/types/entity'

export const useEntityStore = <T extends AbstractEntity>(entity: string) =>
  defineStore(`${entity}-generic-store`, () => {
    const config = useRuntimeConfig()

    const selected = ref<T>()

    const lastFetchTime = ref(0)

    const length = ref(0)

    /** Init Fetch refs for entity */
    const {
      data: entities,
      refresh: refreshGetAll,
      error: errorGetAll
    } = useFetchService<T[]>(`/${entity}`, {
      method: METHODE_HTTP.GET,
      immediate: false,
      onResponse(context) {
        if (!context.response.ok) lastFetchTime.value = 0
      }
    })

    onBeforeMount(async () => {
      await refreshData()
      length.value = entities.value?.length ?? 0
    })

    function setSelected(entity: T | Omit<T, 'id'>) {
      selected.value = JSON.parse(JSON.stringify(entity))
    }

    /**
     * Rafraîchit les données si le temps écoulé depuis la
     * dernière récupération dépasse 10000 millisecondes.
     */
    const refreshData = async () => {
      if (
        Date.now() - lastFetchTime.value >
        parseInt(config.public.FETCH_LIST_INTERVALE)
      ) {
        await refreshGetAll() // Force le rafraîchissement
        lastFetchTime.value = Date.now()
      }
    }

    async function sauvegarderEntity() {
      let path = `/${entity}`
      let mode = METHODE_HTTP.POST
      if (selected.value?.id) {
        path += `/${selected.value?.id}/id`
        mode = METHODE_HTTP.PATCH
      }
      if (selected.value) {
        const {data} = await useFetchService<T>(path, {
          method: mode,
          body: selected.value
        })

        await refreshData()
        return data
      }
    }

    async function findEntity(id: string) {
      if (id) {
        const {data} = await useFetchService<T>(`/${entity}/${id}/id`, {
          method: METHODE_HTTP.GET
        })
        return data.value as Promise<T>
      }
    }

    async function supprimerEntity() {
      if (selected.value) {
        await useFetchService(`/${entity}/${selected.value?.id}/id`, {
          method: METHODE_HTTP.DELETE
        })
        await refreshData()
      }
    }

    return {
      entities,
      length,
      refreshData,
      selected,
      setSelected,
      forceRefresh: refreshGetAll,
      error: errorGetAll,
      sauvegarderEntity,
      supprimerEntity,
      findEntity
    }
  })()
