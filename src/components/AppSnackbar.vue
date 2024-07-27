<script lang="ts" setup>
  import type {SnackbarInterface} from '~/types/snackbar'

  /** === PROPS === */

  interface Props {
    snackbar: SnackbarInterface
    icon: string
  }

  defineProps<Props>()
</script>

<template>
  <VSnackbar
    v-model="snackbar.open"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    role="alert"
    :aria-label="snackbar.message"
    variant="elevated"
  >
    <VContainer class="pa-3">
      <VRow class="align-center">
        <VCol cols="2">
          <VIcon
            :icon="icon"
            size="26"
          />
        </VCol>
        <VCol
          v-html="snackbar.message"
          style="font-size: 1rem"
        />
      </VRow>
    </VContainer>
  </VSnackbar>
</template>

<style scoped></style>
