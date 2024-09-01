<script lang="ts" setup>
  import type {Produit} from './produit'
  import type {TypeProduit} from '~/domains/typeProduit/typeProduit'
  import {VALIDATIONS_RULES} from '~/constants/validationsRules.const'

  /** === PROPS === */

  interface Props {
    typeProduits: TypeProduit[]
  }

  defineProps<Props>()

  const model = defineModel<Produit | Omit<Produit, 'id'>>({
    required: true
  })
</script>

<template>
  <VTextField
    id="nom-field"
    label="Nom"
    v-model="model.nom"
  />
  <AppSelect
    id="typeProduit-field"
    libelle="Type de produit"
    v-model="model.typeProduit"
    :items="typeProduits"
    item-title="nom"
    item-value="id"
  />
  <VTextField
    id="prix-field"
    label="Prix"
    v-model="model.prix"
    suffix="€"
    :rules="[VALIDATIONS_RULES.onlyNumber]"
  />
</template>

<style scoped></style>
