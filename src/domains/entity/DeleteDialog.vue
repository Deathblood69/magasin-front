<script setup lang="ts" generic="T extends AbstractEntity">
  import type {AbstractEntity} from '~/types/entity'

  const open = defineModel<boolean>()

  type Emit = {
    valider: []
  }

  const emit = defineEmits<Emit>()

  function handleSupprimer() {
    emit('valider')
    handleClose()
  }

  function handleClose() {
    open.value = false
  }
</script>

<template>
  <AppDialog
    v-model="open"
    aria-label="Suppression"
    max-width="500px"
  >
    <AppFormLayout
      :loading="false"
      title="Suppression"
      @cancel="handleClose"
      @validate="handleSupprimer"
    >
      <slot />
    </AppFormLayout>
  </AppDialog>
</template>

<style scoped></style>
