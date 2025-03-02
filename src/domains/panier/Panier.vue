<script setup lang="ts">
  import {usePanierStore} from '~/domains/panier/panier.store'
  import {useEntityStore} from '~/domains/entity/entity.store'
  import {ENTITIES} from '~/domains/entities'
  import type {Client} from '~/domains/client/client'
  import {panierHeaders} from '~/domains/panier/panierHeaders'
  import type {ItemPanier} from '~/domains/panier/itemPanier'

  const storeEntity = useEntityStore<Client>(ENTITIES.client)
  const {entities: clients, selected: selectedClient} = storeToRefs(storeEntity)

  const storePanier = usePanierStore()
  const {open, itemsPanier, nombreItems, totalPrix} = storeToRefs(storePanier)
  const {isProduitOutOfStock, addToPanier, subtractToPanier, validerPanier} =
    storePanier

  const disabledPanier = computed(() => {
    if (selectedClient.value && totalPrix.value) {
      return selectedClient.value?.solde <= totalPrix.value
    } else {
      return true
    }
  })

  function handleClickAdd(item: ItemPanier) {
    addToPanier(item.catalogue, 1)
  }

  function handleClickRemove(item: ItemPanier) {
    subtractToPanier(item.catalogue, 1)
  }

  function itemProps(client: Client) {
    return {
      title: `${client.nom} ${client.prenom}`,
      subtitle: `${client.solde}€`
    }
  }

  function totalPrixItem(item: ItemPanier) {
    return item.catalogue.prix * item.stock
  }
</script>

<template>
  <AppMenu
    v-model="open"
    :disabled="nombreItems === 0"
  >
    <template #button>
      <VBadge :content="nombreItems">
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
            :headers="panierHeaders"
            :items="itemsPanier"
          >
            <template #total="{item}">
              {{ totalPrixItem(item) }}
            </template>
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
          <v-select
            v-if="clients"
            v-model="selectedClient"
            :item-props="itemProps"
            :items="clients"
            label="Client"
          />
          <VBtn
            text="Payer"
            variant="flat"
            color="primary"
            @click="validerPanier"
            :disabled="disabledPanier"
          />
        </VListItem>
      </VList>
    </template>
  </AppMenu>
</template>

<style scoped></style>
