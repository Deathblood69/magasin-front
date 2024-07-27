<script setup lang="ts">
  import {useProduitStore} from '~/domains/produits/produit.store'
  import type {ItemGroup} from '~/types/itemGroup'
  import {IMAGES} from 'assets/images/images'
  import {usePanierStore} from '~/domains/panier/panier.store'

  const LIBELLE_STOCK_VIDE = 'Stock Vide'

  const {openSnackbar} = useSnackbarStore()

  const produitStore = useProduitStore()
  const {produits} = storeToRefs(produitStore)

  const {addToPanier, findProduitInCart} = usePanierStore()

  const items = computed(() => {
    return (
      produits.value?.map((e) => {
        return {
          title: e.nom,
          description: `${e.prix}€`,
          image: e.photo.length > 0 ? e.photo : IMAGES.defautSoft,
        } as ItemGroup satisfies ItemGroup
      }) ?? []
    )
  })

  function findProduitInStock(item: ItemGroup) {
    return produits.value?.find((e) => e.nom === item.title)
  }

  function handleClickAdd(item: ItemGroup) {
    const produit = findProduitInStock(item)
    if (produit) {
      addToPanier(produit)
      openSnackbar('Produit ajouté au panier', {
        color: 'success',
        timeout: 2000,
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
        :disabled="item.description === LIBELLE_STOCK_VIDE"
      />
    </template>
  </AppItemGroup>
</template>

<style scoped></style>
