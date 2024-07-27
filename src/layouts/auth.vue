<script lang="ts" setup>
  /** ===  CONFIG ===  **/
  const {snackbar, icon} = storeToRefs(useSnackbarStore())
</script>

<template>
  <VApp>
    <VLayout class="rounded rounded-md">
      <VMain class="d-flex justify-center align-center">
        <slot />
      </VMain>
      <AppSnackbar
        :icon="icon"
        :snackbar="snackbar"
      />
    </VLayout>
  </VApp>
</template>
