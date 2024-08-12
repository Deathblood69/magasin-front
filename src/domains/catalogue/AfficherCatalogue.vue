<script setup lang="ts">
  import type {ItemGroup} from '~/types/itemGroup'
  import {IMAGES} from 'assets/images/images'
  import {usePanierStore} from '~/domains/panier/panier.store'
  import type {Produit} from '~/domains/produit/produit'
  import {ENTITIES} from '~/constants/entities'
  import {useEntityStore} from '~/domains/entity/entity.store'

  const {openSnackbar} = useSnackbarStore()

  const storeEntity = useEntityStore<Produit>(ENTITIES.produit)
  const {entities: produits} = storeToRefs(storeEntity)

  const storePanier = usePanierStore()
  const {isProduitOutOfStock, findProduitInStock, addToPanier} = storePanier

  const items = computed(() => {
    return (
      produits.value?.map((e) => {
        return {
          title: e.nom,
          description: `${e.prix}€`,
          image: IMAGES.defautSoft,
          disabled: e.stock === 0
        } as ItemGroup satisfies ItemGroup
      }) ?? []
    )
  })

  /** LIFECYCLE **/

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
        :disabled="item.disabled || isProduitOutOfStock(item.title)"
      />
    </template>
  </AppItemGroup>
</template>

<style scoped></style>
