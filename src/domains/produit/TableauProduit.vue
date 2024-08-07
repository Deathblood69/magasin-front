<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/constants/entities'
  import {DEFAULT_PRODUIT} from '~/domains/produit/produitDefault.const'
  import type {Produit} from '~/domains/produit/produit'
  import DialogEntity from '~/domains/entity/DialogEntity.vue'
  import FormProduit from '~/domains/produit/FormProduit.vue'
  import {useEntityStore} from '~/domains/entity/entity.store'
  import type {TypeProduit} from '~/domains/typeProduit/typeProduit'

  const entityStore = useEntityStore<TypeProduit>(ENTITIES.typeProduit)
  const {data: typeProduits} = storeToRefs(entityStore)

  const openDialog = ref<boolean>(false)

  function handleOpenForm(value: boolean) {
    openDialog.value = value
  }
</script>

<template>
  <TableauEntity
    :entity="ENTITIES.produit"
    :default-entity="DEFAULT_PRODUIT"
    @openForm="handleOpenForm"
  >
    <template #dialog="{props}">
      <DialogEntity
        v-if="props.selectedProduit"
        title="Produit"
        :default-entity="DEFAULT_PRODUIT"
        v-model:entity="props.selectedProduit as Produit"
        v-model:open="openDialog"
        @change="props.refreshData"
      >
        <FormProduit
          v-if="typeProduits"
          v-model="props.selectedProduit as Produit"
          :type-produits="typeProduits?.map((e) => e.nom)"
        />
      </DialogEntity>
    </template>
  </TableauEntity>
</template>

<style scoped></style>
