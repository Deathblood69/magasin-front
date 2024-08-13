import type {ItemPanier} from '~/domains/panier/itemPanier'
import type {Produit} from '~/domains/produit/produit'
import {useEntityStore} from '~/domains/entity/entity.store'
import {ENTITIES} from '~/domains/entities'
import {useFetchService} from '~/composables/useFetchService'
import {METHODE_HTTP} from '~/constants/methodeHTTP.const'
import type {Client} from '~/domains/client/client'

export const usePanierStore = defineStore('panier', () => {
  const {openSnackbar} = useSnackbarStore()

  const storeProduit = useEntityStore<Produit>(ENTITIES.produit)
  const {entities: produits} = storeToRefs(storeProduit)
  const {refreshData: refreshProduit} = storeProduit

  const storeClient = useEntityStore<Client>(ENTITIES.client)
  const {selected: selectedClient} = storeToRefs(storeClient)
  const {refreshData: refreshClient} = storeClient

  const open = ref<boolean>()

  const items = ref<ItemPanier[]>([])

  const nombreItems = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + item.quantite
    }, 0)
  })

  const totalPrix = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + item.produit.prix * item.quantite
    }, 0)
  })

  function isProduitOutOfStock(nom: string) {
    const produit = findProduitInStock(nom)
    const item = items.value.find((e) => e.produit.nom === nom)
    if (produit && item) {
      return produit?.stock < item.quantite
    } else {
      return false
    }
  }

  function findProduitInStock(nom: string) {
    return produits.value?.find((e) => e.nom === nom)
  }

  function addToPanier(produit: Produit) {
    const item = items.value.find((e) => e.produit.nom === produit.nom)
    if (item) {
      item.quantite++
    } else {
      items.value.push({produit, quantite: 1})
    }
  }

  function subtractToPanier(produit: Produit) {
    const item = items.value.find((e) => e.produit.nom === produit.nom)
    if (item && item?.quantite > 1) {
      item.quantite--
      openSnackbar('Produit retiré du panier', {
        color: 'success',
        timeout: 2000
      })
    } else {
      items.value = items.value.filter((e) => e.produit.nom !== produit.nom)
      open.value = false
    }
  }

  async function validerPanier() {
    const path = `/${ENTITIES.panier}/${selectedClient.value?.id}/valider`
    await useFetchService(path, {
      method: METHODE_HTTP.POST,
      body: items,
      onResponse() {
        open.value = false
        openSnackbar('Panier validé', {
          color: 'success',
          timeout: 2000
        })
        items.value = []
      },
      onResponseError(): Promise<void> | void {
        openSnackbar('Erreur lors de la validation du panier', {
          color: 'error',
          timeout: 2000
        })
      }
    })
    await refreshClient()
    await refreshProduit()
  }

  return {
    open,
    items,
    nombreItems,
    totalPrix,
    isProduitOutOfStock,
    findProduitInStock,
    addToPanier,
    subtractToPanier,
    validerPanier
  }
})
