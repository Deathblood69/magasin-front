<script lang="ts" setup>
  import type {Produit} from './produit'
  import {VALIDATIONS_RULES} from '~/constants/validationsRules.const'

  /** === PROPS === */

  interface Props {
    typeProduits: string[]
  }

  defineProps<Props>()

  const model = defineModel<Produit | Omit<Produit, 'id'>>({
    required: true
  })
</script>

<template>
  <VTextField
    v-model="model.nom"
    id="nom-field"
    label="Nom"
    test-id="nom"
  />
  <VTextField
    v-model="model.prix"
    id="prix-field"
    label="Prix"
    suffix="€"
    test-id="prix"
    :rules="[VALIDATIONS_RULES.onlyNumber]"
  />

  <VTextField
    v-model="model.stock"
    id="stock-field"
    label="Stock"
    test-id="stock"
    type="number"
    :rules="[VALIDATIONS_RULES.onlyNumber]"
  />
  <AppSelect
    id="typeProduit"
    label="Type de produit"
    v-model="model.typeProduit"
    :items="typeProduits"
    density="default"
  />
</template>

<style scoped></style>
