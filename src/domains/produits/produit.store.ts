import {defineStore} from 'pinia'
import type {Produit} from './produit'
import {PATHS_API} from '~/constants/pathsAPI.const'

export const useProduitStore = defineStore('produit', () => {
  const config = useRuntimeConfig()

  const selectedProduit = ref<Produit>()

  const produitsLength = ref<number>(0)

  const {data: produits, refresh} = useFetch<Produit[]>(PATHS_API.produit, {
    baseURL: config.public.NUXT_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    watch: false,
    immediate: false,
  })

  onMounted(async () => {
    await refresh()
    console.log(produits.value)
  })

  return {selectedProduit, produits, produitsLength, refreshTable: refresh}
})
