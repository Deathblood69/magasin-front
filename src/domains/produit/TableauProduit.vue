<script lang="ts" setup>
  import {DATATABLE_HEADERS} from '~/constants/dataTableHeaders'
  import type {Produit} from './produit'
  import {ROLES} from '~/constants/roles.const'
  import {DEFAULT_PRODUIT_CONSTANTS} from '~/domains/produit/produitDefault.const'
  import DialogProduit from '~/domains/produit/DialogProduit.vue'
  import {useProduitStore} from '~/domains/produit/produit.store'

  const produitStore = useProduitStore()
  const {selectedProduit, produits, produitsLength} = storeToRefs(produitStore)
  const {refresh} = produitStore

  const dialogs = ref({
    produit: false
  })

  function openCreateProduit() {
    selectedProduit.value = JSON.parse(
      JSON.stringify(DEFAULT_PRODUIT_CONSTANTS)
    )
    dialogs.value.produit = true
  }

  function openEditProduit(produit: Produit) {
    selectedProduit.value = JSON.parse(JSON.stringify(produit))
    dialogs.value.produit = true
  }

  function openDeleteProduit(produit: Produit) {}
</script>

<template>
  <VCard width="95%">
    <VCardTitle class="text-right">
      <VBtn
        color="primary"
        prepend-icon="mdi-plus"
        text="Ajouter"
        variant="flat"
        @click="openCreateProduit"
      />
    </VCardTitle>
    <VCardText>
      <AppDataTable
        v-if="produits"
        :headers="DATATABLE_HEADERS.produit"
        :items-length="produitsLength"
        :items="produits"
      >
        <template #actions="{item: produit}">
          <VBtnGroup>
            <VBtn
              aria-label="edit"
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click="openEditProduit(produit)"
              title="Modifier"
            />
            <VBtn
              aria-label="delete"
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="openDeleteProduit(produit)"
              title="Supprimer"
            />
          </VBtnGroup>
        </template>
        <template #roles="{value}">
          <VChip
            v-for="role in value"
            :key="role"
          >
            {{ ROLES[role].title }}
          </VChip>
        </template>
      </AppDataTable>
    </VCardText>
  </VCard>
  <DialogProduit
    v-if="selectedProduit"
    v-model:open="dialogs.produit"
    v-model:produit="selectedProduit"
    @change="refresh"
  />
</template>

<style scoped></style>
