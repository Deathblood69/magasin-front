<script lang="ts" setup>
  import type {TypeProduit} from '~/domains/typeProduit/typeProduit'

  const model = defineModel<TypeProduit | Omit<TypeProduit, 'id'>>({
    required: true
  })
</script>

<template>
  <VTextField
    id="nom-field"
    label="Nom"
    v-model="model.nom"
  />
</template>

<style scoped></style>
