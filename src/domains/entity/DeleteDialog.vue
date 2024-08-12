<script setup lang="ts" generic="T extends AbstractEntity">
  import type {AbstractEntity} from '~/types/entity'

  const open = defineModel<boolean>()

  const isLoading = ref(false)

  type Emit = {
    valider: []
  }

  const emit = defineEmits<Emit>()

  /**
   * Ferme la boîte de dialogue de suppression.
   */
  function closeDeleteDialog() {
    open.value = false
  }

  function handleSupprimer() {
    isLoading.value = true
    emit('valider')
    closeDeleteDialog()
  }
</script>

<template>
  <AppDialog
    v-model="open"
    aria-label="Suppression"
    max-width="500px"
  >
    <AppFormLayout
      :loading="isLoading"
      title="Suppression"
      @cancel="closeDeleteDialog"
      @validate="handleSupprimer"
    >
      <slot />
    </AppFormLayout>
  </AppDialog>
</template>

<style scoped></style>
