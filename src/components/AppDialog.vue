<script setup lang="ts">
  /** === PROPS === */

  const dialog = defineModel({
    type: Boolean,
    default: false
  })
</script>

<template>
  <VDialog
    v-model="dialog"
    persistent
    size="unset"
  >
    <slot />
  </VDialog>
</template>
