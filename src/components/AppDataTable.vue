<script setup lang="ts">
  import type {AppDataTableHeaders} from '~/types/headers'

  interface Props {
    headers: AppDataTableHeaders
    items: any[]
    itemsLength: number
  }

  const props = defineProps<Props>()

  const keys = computed(() => {
    return props.headers?.map((header) => header.key) || []
  })
</script>

<template>
  <VDataTableServer
    :headers="headers"
    :items="items ?? []"
    :items-length="itemsLength"
  >
    <template
      v-for="key in keys"
      v-slot:[`item.${key}`]="props"
    >
      <slot
        :name="key"
        v-bind="props"
      >
        {{ props.value }}
      </slot>
    </template>
  </VDataTableServer>
</template>

<style scoped></style>
