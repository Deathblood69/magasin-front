<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/constants/entities'
  import {DEFAULT_PRODUIT} from '~/domains/produit/produitDefault.const'
  import type {Produit} from '~/domains/produit/produit'
  import FormProduit from '~/domains/produit/FormProduit.vue'
  import {useEntityStore} from '~/domains/entity/entity.store'
  import type {TypeProduit} from '~/domains/typeProduit/typeProduit'

  const entityStore = useEntityStore<TypeProduit>(ENTITIES.typeProduit)
  const {data: typeProduits} = storeToRefs(entityStore)

  function handleFindTypeProduit(id: string) {
    return typeProduits.value?.find((e) => e.id === id)?.nom
  }
</script>

<template>
  <TableauEntity
    :entity="ENTITIES.produit"
    :default-entity="DEFAULT_PRODUIT"
  >
    <template #typeProduit="{value}">
      <VChip>
        {{ handleFindTypeProduit(value) }}
      </VChip>
    </template>
    <template #form="{props}">
      <FormProduit
        v-if="typeProduits"
        v-model="props.selectedEntity as Produit"
        :type-produits="typeProduits?.map((e) => e.nom)"
      />
    </template>
    <template #messageDelete>
      {{ 'Voulez-vous supprimer ce produit ?' }}
    </template>
  </TableauEntity>
</template>

<style scoped></style>
