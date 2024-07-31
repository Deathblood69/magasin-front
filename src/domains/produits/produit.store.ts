import {defineStore} from 'pinia'
import type {Produit} from './produit'
import {PATHS_API} from '~/constants/pathsAPI.const'
import type {ItemPanier} from '~/domains/panier/panier'

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
  })

  function isProduitOutOfStock(produit: ItemPanier) {
    console.log(produit)
    return produits.value?.some(
      (produitStock) => produitStock.stock <= produit?.quantite,
    )
  }

  return {
    selectedProduit,
    produits,
    produitsLength,
    refreshTable: refresh,
    isProduitOutOfStock,
  }
})
