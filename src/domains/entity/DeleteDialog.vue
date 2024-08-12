<script setup lang="ts" generic="T extends AbstractEntity">
  import type {AbstractEntity} from '~/types/entity'

  const open = defineModel<boolean>()

  type Emit = {
    valider: []
  }

  const emit = defineEmits<Emit>()

  function handleSupprimer() {
    emit('valider')
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
