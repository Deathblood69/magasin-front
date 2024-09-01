<script lang="ts" setup>
  import type {Course} from '~/domains/course/course'

  /** === PROPS === */

  const model = defineModel<Course>({
    required: true
  })

  function formatDate(date: string) {
    return new Date(date)
  }

  function parseDate(date: Date) {
    return date.toISOString()
  }
</script>

<template>
  <VTextField
    id="nom-field"
    label="Nom"
    v-model="model.nom"
  />
  <AppDatePicker
    label="Date"
    v-model="model.date"
    :format-date="formatDate"
    :parse-date="parseDate"
  />
</template>

<style scoped></style>
