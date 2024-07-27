<script setup lang="ts">
  /** === PROPS === */

  const dialog = defineModel({
    type: Boolean,
    default: false,
  })
</script>

<template>
  <VDialog
    v-model="dialog"
    persistent
    @close="console.log('test')"
  >
    <slot />
  </VDialog>
</template>
