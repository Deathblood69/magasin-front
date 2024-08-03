import {defineStore} from 'pinia'
import type {Produit} from './produit'
import {PATHS_API} from '~/constants/pathsAPI.const'
import {METHODE_HTTP} from '~/constants/methodeHTTP.const'

export const useProduitStore = defineStore('produit', () => {
  const selectedProduit = ref<{
    id: string
    produit: Partial<Produit>
  }>()

  const produitsLength = ref<number>(0)

  const {data: produits, refresh} = useFetchService<Produit[]>(
    PATHS_API.produit
  )

  onMounted(async () => {
    await refresh()
  })

  function findProduitInStock(nom: string) {
    return produits.value?.find((e) => e.nom === nom)
  }

  async function retirerQuantiteProduit(nom: string, quantite: number) {
    const produit = findProduitInStock(nom)

    if (produit) {
      await useFetchService<Produit[]>(
        `${PATHS_API.produit}/${produit?.id}/id`,
        {
          method: METHODE_HTTP.PATCH,
          body: {
            stock: produit.stock - quantite
          }
        }
      )
      await refresh()
    }
  }

  return {
    selectedProduit,
    produits,
    produitsLength,
    refresh,
    findProduitInStock,
    retirerQuantiteProduit
  }
})
