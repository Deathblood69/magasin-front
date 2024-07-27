<script setup lang="ts">
  import type {AppDataTableHeaders} from '~/types/headers'

  interface Props {
    headers: AppDataTableHeaders
    items: any[]
  }

  defineProps<Props>()
</script>

<template>
  <VDataTableVirtual
    :headers="headers"
    :items="items ?? []"
  >
    <template v-slot:item.actions="{item}">
      <slot
        :item="item"
        name="actions"
      />
    </template>
  </VDataTableVirtual>
</template>

<style scoped></style>
