<script lang="ts" setup>
  import type {Client} from './client'
  import {VALIDATIONS_RULES} from '~/constants/validationsRules.const'

  /** === PROPS === */

  const model = defineModel<Client | Omit<Client, 'id'>>({
    required: true
  })
</script>

<template>
  <VTextField
    v-model="model.identifiant"
    id="identifiant-field"
    label="Identifiant"
    test-id="identifiant"
  />
  <VTextField
    v-model="model.nom"
    id="nom-field"
    label="Nom"
    test-id="nom"
  />
  <VTextField
    v-model="model.prenom"
    id="prenom-field"
    label="Prénom"
    test-id="prenom"
  />

  <VTextField
    v-model="model.solde"
    id="solde-field"
    label="Solde"
    suffix="€"
    test-id="solde"
    :rules="[VALIDATIONS_RULES.onlyNumber]"
  />
</template>

<style scoped></style>
