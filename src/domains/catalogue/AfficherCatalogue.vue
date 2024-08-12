<script setup lang="ts">
  import type {ItemGroup} from '~/types/itemGroup'
  import {IMAGES} from 'assets/images/images'
  import {usePanierStore} from '~/domains/panier/panier.store'
  import type {Produit} from '~/domains/produit/produit'
  import {ENTITIES} from '~/constants/entities'
  import {useEntityStore} from '~/domains/entity/entity.store'

  const {openSnackbar} = useSnackbarStore()

  const {findProduitInStock} = usePanierStore()

  const storeEntity = useEntityStore<Produit>(ENTITIES.produit)
  const {entities: produits} = storeToRefs(storeEntity)

  const panierStore = usePanierStore()
  const {addToPanier} = panierStore
  const {panier} = storeToRefs(panierStore)

  const items = computed(() => {
    return (
      produits.value?.map((e) => {
        return {
          title: e.nom,
          description: `${e.prix}€`,
          image: e?.photo?.length > 0 ? e.photo : IMAGES.defautSoft,
          disabled: e.stock === 0
        } as ItemGroup satisfies ItemGroup
      }) ?? []
    )
  })

  /** LIFECYCLE **/

  function isProduitOutOfStock(item: ItemGroup) {
    const quantiteInStock = findProduitInStock(item.title)?.stock
    const quantiteInPanier = panier.value?.find(
      (produitPanier) => produitPanier.produit.nom === item.title
    )?.quantite
    if (quantiteInStock && quantiteInPanier) {
      return quantiteInStock <= quantiteInPanier
    } else {
      return false
    }
  }

  function handleClickAdd(item: ItemGroup) {
    const produit = findProduitInStock(item.title)
    if (produit) {
      addToPanier(produit)
      openSnackbar('Produit ajouté au panier', {
        color: 'success',
        timeout: 2000
      })
    }
  }
</script>

<template>
  <AppItemGroup
    :items="items"
    defautImage="~/assets/images/defautSoft.svg"
  >
    <template #actions="{item}">
      <VBtn
        icon="mdi-cart-variant"
        @click="handleClickAdd(item)"
        :disabled="item.disabled || isProduitOutOfStock(item)"
      />
    </template>
  </AppItemGroup>
</template>

<style scoped></style>
