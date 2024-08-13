<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/domains/entities'
  import {DEFAULT_PRODUIT} from '~/domains/produit/produitDefault.const'
  import type {Produit} from '~/domains/produit/produit'
  import FormProduit from '~/domains/produit/FormProduit.vue'
  import {useEntityStore} from '~/domains/entity/entity.store'
  import type {TypeProduit} from '~/domains/typeProduit/typeProduit'
  import {produitHeaders} from '~/domains/produit/produitHeaders'

  const entityStore = useEntityStore<TypeProduit>(ENTITIES.typeProduit)
  const {entities: typeProduits} = storeToRefs(entityStore)

  function handleFindTypeProduit(id: string) {
    return typeProduits.value?.find((e) => e.id === id)?.nom
  }
</script>

<template>
  <TableauEntity
    titre="Produits"
    :entity="ENTITIES.produit"
    :default-entity="DEFAULT_PRODUIT"
    :headers="produitHeaders"
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
        :type-produits="typeProduits as TypeProduit[]"
      />
    </template>
    <template #messageDelete>
      {{ 'Voulez-vous supprimer ce produit ?' }}
    </template>
  </TableauEntity>
</template>

<style scoped></style>
