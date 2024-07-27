<script setup lang="ts">
  import {usePanierStore} from '~/domains/panier/panier.store'
  import {DATATABLE_HEADERS} from '~/constants/dataTableHeaders'
  import type {ItemGroup} from '~/types/itemGroup'
  import {useProduitStore} from '~/domains/produits/produit.store'

  const {openSnackbar} = useSnackbarStore()

  const produitStore = useProduitStore()
  const {produits} = storeToRefs(produitStore)

  const panierStore = usePanierStore()
  const {addToPanier, removeFromPanier} = panierStore
  const {panier, nombreArticles, totalPrix} = storeToRefs(panierStore)

  const items = computed(() => {
    return (
      panier.value?.map((e) => {
        return {
          title: e.produit.nom,
          prix: `${e.produit.prix}€`,
          quantite: e.quantite,
          total: `${e.produit.prix * e.quantite}€`,
        }
      }) ?? []
    )
  })

  function findProduit(item: ItemGroup) {
    return produits?.value?.find((e) => e.nom === item.title)
  }

  function findProduitInCart(item: ItemGroup) {
    return panier.value?.find((e) => e.produit.nom === item.title)
  }

  function handleClickAdd(item: ItemGroup) {
    const produit = findProduit(item)
    if (produit) {
      addToPanier(produit)
      openSnackbar('Produit modifié', {
        color: 'success',
        timeout: 2000,
      })
    }
  }

  function handleClickRemove(item: ItemGroup) {
    const produit = findProduit(item)
    if (produit) {
      removeFromPanier(produit)
      openSnackbar('Produit modifié', {
        color: 'success',
        timeout: 2000,
      })
    }
  }

  function checkIfStockVide(item: ItemGroup) {
    const produitInStock = findProduit(item)
    const produitInCart = findProduitInCart(item)
    console.log(produitInCart, produitInStock)
    return false
  }

  function handleValiderPanier() {}
</script>

<template>
  <AppMenu :disabled="nombreArticles === 0">
    <template #button>
      <VBadge :content="nombreArticles">
        <VIcon
          icon="mdi-cart-outline"
          size="x-large"
        />
      </VBadge>
    </template>
    <template #default>
      <VList>
        <VListItem>
          <AppDataTableVirtual
            :headers="DATATABLE_HEADERS.panier"
            :items="items"
          >
            <template #actions="{item}">
              <VBtnGroup>
                <VBtn
                  title="Ajouter"
                  aria-label="plus"
                  icon="mdi-plus"
                  size="small"
                  variant="text"
                  @click="handleClickAdd(item)"
                  :disabled="checkIfStockVide(item)"
                />
                <VBtn
                  title="Retirer"
                  aria-label="minus"
                  icon="mdi-minus"
                  size="small"
                  variant="text"
                  @click="handleClickRemove(item)"
                />
              </VBtnGroup>
            </template>
          </AppDataTableVirtual>
          <VContainer class="text-right">
            Total Panier :
            {{ totalPrix }}€
          </VContainer>
          <VBtn
            text="Payer"
            variant="plain"
            color="primary"
            @click="handleValiderPanier"
          />
        </VListItem>
      </VList>
    </template>
  </AppMenu>
</template>

<style scoped></style>
