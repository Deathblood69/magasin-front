<script setup lang="ts">
  interface Props {
    items: any[]
  }

  defineProps<Props>()

  const item = defineModel<any>('item')
</script>

<template>
  <v-select
    density="compact"
    label="Select"
    :items="items"
    v-model="item"
  ></v-select>
</template>

<style scoped></style>
