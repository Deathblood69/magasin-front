<script setup lang="ts">
  import {usePanierStore} from '~/domains/panier/panier.store'
  import {DATATABLE_HEADERS} from '~/constants/dataTableHeaders'
  import type {ItemGroup} from '~/types/itemGroup'
  import {useProduitStore} from '~/domains/panier/produit.store'
  import {useClientStore} from '~/domains/panier/clients.store'

  const {openSnackbar} = useSnackbarStore()

  const {findProduitInStock} = useProduitStore()

  const panierStore = usePanierStore()
  const {addToPanier, removeFromPanier, findProduitInPanier, validerPanier} =
    panierStore

  const clientStore = useClientStore()
  const {clients, selectedClient} = storeToRefs(clientStore)

  const openPanier = ref<boolean>(false)

  const {panier, nombreArticles, totalPrix} = storeToRefs(panierStore)
  const items = computed(() => {
    return (
      panier.value?.map((produitPanier) => {
        return {
          title: produitPanier.produit.nom,
          prix: `${produitPanier.produit.prix}€`,
          quantite: produitPanier.quantite,
          total: `${produitPanier.produit.prix * produitPanier.quantite}€`
        }
      }) ?? []
    )
  })

  function isProduitOutOfStock(item: ItemGroup) {
    const quantiteInStock = findProduitInStock(item.title)?.stock
    const quantiteInPanier = findProduitInPanier(item.title)?.quantite
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
      openSnackbar('Produit modifié', {
        color: 'success',
        timeout: 2000
      })
    }
  }

  function handleClickRemove(item: ItemGroup) {
    const produit = findProduitInStock(item.title)
    if (produit) {
      removeFromPanier(produit)
      openSnackbar('Produit modifié', {
        color: 'success',
        timeout: 2000
      })
    }
  }

  async function handleValiderPanier() {
    await validerPanier()
    openPanier.value = false
    openSnackbar('Panier validé', {
      color: 'success',
      timeout: 2000
    })
  }
</script>

<template>
  <AppMenu
    v-model="openPanier"
    :disabled="nombreArticles === 0"
  >
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
                  :disabled="isProduitOutOfStock(item)"
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
          <AppSelect
            v-if="clients"
            :items="clients.map((e) => e.identifiant)"
            v-model="selectedClient"
          />
          <VBtn
            text="Payer"
            variant="flat"
            color="primary"
            @click="handleValiderPanier"
          />
        </VListItem>
      </VList>
    </template>
  </AppMenu>
</template>

<style scoped></style>
