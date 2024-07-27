import type {Produit} from '~/domains/produits/produit'
import type {ItemPanier} from '~/domains/panier/panier'
import type {ItemGroup} from '~/types/itemGroup'

export const usePanierStore = defineStore('panier', () => {
  const panier = ref<ItemPanier[]>([])

  const totalPrix = computed(() => {
    return panier.value.reduce(
      (acc, item) => acc + item.produit.prix * item.quantite,
      0,
    )
  })

  const nombreArticles = computed(() => {
    return panier.value.reduce((acc, item) => acc + item.quantite, 0)
  })

  const openPanier = ref<boolean>(false)

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

  function findProduitInCart(produit: Produit) {
    const index = findIndexInPanier(produit)
    return panier.value[index]
  }

  return {
    panier,
    totalPrix,
    nombreArticles,
    openPanier,
    addToPanier,
    removeFromPanier,
    findProduitInCart,
  }
})
