import type {Produit} from '~/domains/produit/produit'
import type {ItemPanier} from '~/domains/panier/panier'
import type {Client} from '~/domains/client/client'
import {PATHS_API} from '~/constants/pathsAPI.const'
import {METHODE_HTTP} from '~/constants/methodeHTTP.const'
import type {Solde} from '~/domains/solde/solde'

export const usePanierStore = defineStore('panier', () => {
  const selectedClient = ref<string>()

  const panier = ref<ItemPanier[]>([])

  const totalPrix = computed(() => {
    return panier.value.reduce(
      (acc, item) => acc + item.produit.prix * item.quantite,
      0
    )
  })

  const nombreArticles = computed(() => {
    return panier.value.reduce((acc, item) => acc + item.quantite, 0)
  })

  const {data: clients} = useFetchService<Client[]>(PATHS_API.client)

  const {data: produits} = useFetchService<Produit[]>(PATHS_API.produit, {
    immediate: false
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
      // await refresh()
    }
  }

  function findIndexInPanier(produit: Produit) {
    return panier.value.findIndex((item) => item.produit.nom === produit.nom)
  }

  function addToPanier(produit: Produit) {
    const index = findIndexInPanier(produit)
    if (index !== -1) {
      panier.value[index].quantite++
    } else {
      panier.value.push({produit, quantite: 1})
    }
  }

  function removeFromPanier(produit: Produit) {
    const index = findIndexInPanier(produit)
    if (index !== -1) {
      if (panier.value[index].quantite > 1) {
        panier.value[index].quantite--
      } else {
        panier.value.splice(index, 1)
      }
    }
  }

  function findProduitInPanier(nom: string) {
    return panier.value?.find(
      (produitPanier) => produitPanier.produit.nom === nom
    )
  }

  async function validerPanier() {
    await debiterClient(totalPrix.value)
    for (const item of panier.value) {
      await retirerQuantiteProduit(item.produit.nom, item.quantite)
    }
    panier.value = []
  }

  async function debiterClient(quantite: number) {
    if (selectedClient.value && quantite) {
      const soldeId = clients.value?.find(
        (client) => client.identifiant === selectedClient.value
      )?.solde
      if (soldeId) {
        await retirerQuantiteSolde(soldeId, quantite)
      }
    }
  }

  async function retirerQuantiteSolde(soldeId: string, quantite: number) {
    const {data: solde} = await useFetchService<Solde>(
      `${PATHS_API.solde}/${soldeId}/id`,
      {
        method: METHODE_HTTP.GET
      }
    )

    if (solde.value) {
      await useFetchService<Solde[]>(
        `${PATHS_API.solde}/${solde.value?.id}/id`,
        {
          method: METHODE_HTTP.PATCH,
          body: {
            valeur: solde.value.valeur - quantite
          }
        }
      )
    }
  }

  return {
    panier,
    totalPrix,
    nombreArticles,
    clients,
    selectedClient,
    addToPanier,
    removeFromPanier,
    findProduitInPanier,
    validerPanier,
    findProduitInStock
  }
})
