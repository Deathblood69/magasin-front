import type {Produit} from '~/domains/produit/produit'
import {useEntityStore} from '~/domains/entity/entity.store'
import {ENTITIES} from '~/domains/entities'
import {useFetchService} from '~/composables/useFetchService'
import {METHODE_HTTP} from '~/constants/methodeHTTP.const'
import type {Client} from '~/domains/client/client'
import {useCatalogueStore} from '~/domains/catalogue/catalogue.store'
import type {Catalogue} from '~/domains/catalogue/catalogue'
import type {ItemPanier} from '~/domains/panier/itemPanier'
import {PATHS_API} from '~/constants/pathsAPI.const'

export const usePanierStore = defineStore('panier', () => {
  const {openSnackbar} = useSnackbarStore()

  const {findByProduitNom, refresh: refreshCatalogue} = useCatalogueStore()

  const storeProduit = useEntityStore<Produit>(ENTITIES.produit)
  const {entities: produits} = storeToRefs(storeProduit)
  const {refreshData: refreshProduit} = storeProduit

  const storeClient = useEntityStore<Client>(ENTITIES.client)
  const {selected: selectedClient} = storeToRefs(storeClient)
  const {refreshData: refreshClient} = storeClient

  const {data: getItemsCatalogue} = useFetchService<Catalogue[]>(
    `${PATHS_API.catalogue}/all`
  )

  const open = ref<boolean>()

  const itemsPanier = ref<ItemPanier[]>([])

  const nombreItems = computed(() => {
    return itemsPanier.value.reduce((sum, item) => {
      return sum + item.stock
    }, 0)
  })

  const totalPrix = computed(() => {
    return itemsPanier.value.reduce((sum, item) => {
      const catalogue = findByProduitNom(item.catalogue.nom)
      if (catalogue) {
        return sum + catalogue?.prix * item.stock
      } else {
        return sum
      }
    }, 0)
  })

  const items: Catalogue[] = []
  const itemsCatalogue = computed(() => {
    return getItemsCatalogue.value?.reduce((acc, e) => {
      const index = acc.findIndex((item) => item.nom === e.nom)
      if (index === -1) {
        const produit = produits.value?.find((produit) => produit.nom === e.nom)
        acc.push({
          ...e,
          prix: produit?.prix ?? -1
        })
      } else {
        console.log(acc, index)
        acc[index].stock += e.stock
      }
      return acc
    }, items)
  })

  function findItemByNom(nom: string) {
    return itemsPanier.value.find((e) => e.catalogue.nom === nom)
  }

  function isProduitOutOfStock(catalogue: Catalogue) {
    const itemPanier = itemsPanier.value.find(
      (e) => e.catalogue.nom === catalogue.nom
    )
    if (!itemPanier) {
      return catalogue?.stock <= 0
    } else {
      if (itemPanier) {
        return itemPanier.stock >= catalogue.stock
      }
    }
    return false
  }

  function findProduitbyNom(nom: string) {
    return produits.value?.find((e) => e.nom === nom)
  }

  function addToPanier(catalogue: Catalogue, quantite: number) {
    const item = findItemByNom(catalogue.nom)
    if (item) {
      item.stock += quantite
    } else {
      itemsPanier.value.push({catalogue, stock: 1, prix: catalogue.prix})
    }
  }

  function subtractToPanier(catalogue: Catalogue, quantite: number) {
    const item = findItemByNom(catalogue.nom)
    if (item && item?.stock > 1) {
      item.stock -= quantite
      openSnackbar('Achat retiré du panier', {
        color: 'success',
        timeout: 2000
      })
    } else {
      itemsPanier.value = itemsPanier.value.filter(
        (e) => e.catalogue.nom !== catalogue.nom
      )
      open.value = false
    }
  }

  async function validerPanier() {
    const path = `/${ENTITIES.panier}/${selectedClient.value?.id}/valider`
    await useFetchService(path, {
      method: METHODE_HTTP.POST,
      body: itemsPanier.value,
      onResponse() {
        open.value = false
        openSnackbar('Panier validé', {
          color: 'success',
          timeout: 2000
        })
        itemsPanier.value = []
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
    await refreshCatalogue()
  }

  return {
    open,
    itemsCatalogue,
    itemsPanier,
    nombreItems,
    totalPrix,
    isProduitOutOfStock,
    findProduitInStock: findProduitbyNom,
    addToPanier,
    subtractToPanier,
    validerPanier
  }
})
