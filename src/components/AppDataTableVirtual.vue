<script setup lang="ts">
  import type {AppDataTableHeaders} from '~/types/headers'

  interface Props {
    headers: AppDataTableHeaders
    items: any[]
  }

  const props = defineProps<Props>()

  const keys = computed(() => {
    return props.headers?.map((header) => header.key) || []
  })
</script>

<template>
  <VDataTableVirtual
    :headers="headers"
    :items="items ?? []"
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
  </VDataTableVirtual>
</template>

<style scoped></style>
