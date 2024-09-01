<script lang="ts" setup>
  import type {Course} from '~/domains/course/course'

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
</template>

<style scoped></style>
