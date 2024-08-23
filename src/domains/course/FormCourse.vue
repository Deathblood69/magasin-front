<script lang="ts" setup>
  import type {Course} from '~/domains/course/course'
  import TableauAchat from '~/domains/achat/TableauAchat.vue'

  /** === PROPS === */

  const model = defineModel<Course>({
    required: true
  })
</script>

<template>
  <VTextField
    id="nom-field"
    label="Nom"
    v-model="model.nom"
  />
  <TableauAchat :course="model" />
</template>

<style scoped></style>
