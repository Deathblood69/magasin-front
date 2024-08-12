<script setup lang="ts">
  import {IMAGES} from 'assets/images/images'

  const {app: appConfig} = useRuntimeConfig()
</script>

<template>
  <VAppBar
    :elevation="2"
    color="primary"
  >
    <VImg
      :src="IMAGES.logo"
      max-width="50px"
    />
    <VAppBarTitle> {{ appConfig.TITRE }}</VAppBarTitle>
    <template v-slot:append>
      <slot name="actions" />
    </template>
  </VAppBar>
</template>

<style scoped></style>
