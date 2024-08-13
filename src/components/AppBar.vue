<script setup lang="ts">
  interface Props {
    titre: string
  }

  defineProps<Props>()
</script>

<template>
  <VAppBar
    :elevation="2"
    color="primary"
  >
    <slot name="logo" />
    <VAppBarTitle> {{ titre }}</VAppBarTitle>
    <template v-slot:append>
      <slot name="actions" />
    </template>
  </VAppBar>
</template>

<style scoped></style>
