import type {Produit} from '~/domains/produit/produit'
import type {ItemPanier} from '~/domains/panier/panier'
import {useProduitStore} from '~/domains/panier/produit.store'
import {useClientStore} from '~/domains/panier/clients.store'

export const usePanierStore = defineStore('panier', () => {
  const {retirerQuantiteProduit} = useProduitStore()

  const {debiterClient} = useClientStore()

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

  return {
    panier,
    totalPrix,
    nombreArticles,
    addToPanier,
    removeFromPanier,
    findProduitInPanier,
    validerPanier
  }
})
