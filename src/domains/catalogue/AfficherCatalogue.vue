<script setup lang="ts">
  import {usePanierStore} from '~/domains/panier/panier.store'
  import {PATHS_API} from '~/constants/pathsAPI.const'
  import type {Catalogue} from '~/domains/catalogue/catalogue'

  const {openSnackbar} = useSnackbarStore()

  const {data: items} = useFetchService<Catalogue[]>(
    `${PATHS_API.catalogue}/all`
  )

  const storePanier = usePanierStore()
  const {isProduitOutOfStock, findProduitInStock, addToPanier} = storePanier

  /** LIFECYCLE **/

  function handleClickAdd(item: Catalogue) {
    if (item) {
      addToPanier(item, 1)
      openSnackbar('Achat ajouté au panier', {
        color: 'success',
        timeout: 2000
      })
    }
  }
</script>

<template>
  <AppItemGroup
    v-if="items"
    :items="items"
    defautImage="~/assets/images/defautSoft.svg"
  >
    <template #item="{item}">
      <div>
        {{ item.nom }}
      </div>
      <div>
        {{ `${item.prix}€` }}
      </div>
    </template>
    <template #actions="{item}">
      <VBtn
        icon="mdi-cart-variant"
        @click="handleClickAdd(item)"
        :disabled="isProduitOutOfStock(item)"
      />
    </template>
  </AppItemGroup>
</template>

<style scoped></style>
