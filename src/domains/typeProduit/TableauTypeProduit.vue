<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/domains/entities'
  import {DEFAULT_TYPE_PRODUIT} from '~/domains/typeProduit/typeProduitDefault.const'
  import type {TypeProduit} from '~/domains/typeProduit/typeProduit'
  import FormTypeProduit from '~/domains/typeProduit/FormTypeProduit.vue'
  import {typeProduitHeaders} from '~/domains/typeProduit/typeProduitHeaders'
</script>

<template>
  <TableauEntity
    titre="TypeProduits"
    :entity="ENTITIES.typeProduit"
    :default-entity="DEFAULT_TYPE_PRODUIT"
    :headers="typeProduitHeaders"
  >
    <template #form="{props}">
      <FormTypeProduit v-model="props.selectedEntity as TypeProduit" />
    </template>
    <template #messageDelete>
      {{ 'Voulez-vous supprimer ce type de produit ?' }}
    </template>
  </TableauEntity>
</template>

<style scoped></style>
