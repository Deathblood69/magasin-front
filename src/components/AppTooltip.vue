<script setup lang="ts">
  /** === PROPS === */

  interface Props {
    text?: string
  }

  defineProps<Props>()
</script>

<template>
  <VTooltip
    :text="text"
    location="end bottom"
    origin="top start"
    activator="parent"
  />
</template>

<style scoped>

</style>