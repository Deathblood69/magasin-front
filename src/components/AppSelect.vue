<script setup lang="ts">
  interface Props {
    libelle: string
    items: any[]
  }

  defineProps<Props>()

  const item = defineModel<any>()
</script>

<template>
  <VSelect
    :label="libelle"
    :items="items"
    v-model="item"
  />
</template>

<style scoped></style>
