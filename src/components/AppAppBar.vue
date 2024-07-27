<script setup lang="ts"></script>

<template>
  <VAppBar
    :elevation="2"
    color="primary"
  >
    <VAppBarTitle>Application Bar</VAppBarTitle>
    <template v-slot:append>
      <slot name="actions" />
    </template>
  </VAppBar>
</template>

<style scoped></style>
