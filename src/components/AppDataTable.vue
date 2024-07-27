<script setup lang="ts">
  import type {AppDataTableHeaders} from '~/types/headers'

  interface Props {
    headers: AppDataTableHeaders
    items: any[]
    itemsLength: number
  }

  defineProps<Props>()
</script>

<template>
  <VDataTableServer
    :headers="headers"
    :items="items ?? []"
    :items-length="itemsLength"
  >
    <template v-slot:item.actions="{item}">
      <slot
        :item="item"
        name="actions"
      />
    </template>
  </VDataTableServer>
</template>

<style scoped></style>
