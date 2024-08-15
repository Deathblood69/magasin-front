<script setup lang="ts">
  interface Props {
    titre: string
    logo: string
  }

  defineProps<Props>()
</script>

<template>
  <VAppBar
    :elevation="2"
    color="primary"
  >
    <VAppBarTitle>
      <VRow
        align="center"
        no-gutters
      >
        <VCol cols="1">
          <VImg
            :src="logo"
            max-width="50px"
          />
        </VCol>
        <VCol>
          {{ titre }}
        </VCol>
      </VRow>
    </VAppBarTitle>
    <template v-slot:append>
      <slot name="actions" />
    </template>
  </VAppBar>
</template>

<style scoped></style>
