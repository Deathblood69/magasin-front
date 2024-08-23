<script lang="ts" setup>
  import {VALIDATIONS_RULES} from '~/constants/validationsRules.const'
  import type {Produit} from '~/domains/produit/produit'
  import type {Achat} from '~/domains/achat/achat'

  /** === PROPS === */

  interface Props {
    produits: Produit[]
  }

  defineProps<Props>()

  const model = defineModel<Achat | Omit<Achat, 'id'>>({
    required: true
  })
</script>

<template>
  <VAutocomplete
    v-model="model.produit"
    :items="produits"
    item-title="nom"
    item-value="id"
    density="compact"
  />
  <VTextField
    id="stock-field"
    label="Stock"
    v-model="model.stock"
    type="number"
    :rules="[VALIDATIONS_RULES.onlyNumber]"
    density="compact"
  />
  <VTextField
    id="prix-field"
    label="Prix"
    v-model="model.prix"
    suffix="€"
    :rules="[VALIDATIONS_RULES.onlyNumber]"
    density="compact"
  />
</template>

<style scoped></style>
