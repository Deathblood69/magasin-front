<script lang="ts" setup>
  /** === PROPS === */

  interface Props {
    title?: string
    subtitle?: string
    loading?: boolean
    closable?: boolean
    btnValider?: {
      libelle: string
      disabled?: boolean
    }
    btnAnnuler?: {
      libelle: string
      disabled?: boolean
    }
    width?: string
  }

  withDefaults(defineProps<Props>(), {
    loading: false,
    title: '',
    subtitle: '',
    closable: true,
    width: undefined
  })

  /** === REFS === */

  const afterClickLoading = ref(false)

  const form = ref()

  /** === EMITS  === */

  type Emits = {
    validate: []
    cancel: [value: 'btn' | 'close']
  }

  const emit = defineEmits<Emits>()

  /** === METHODES === */

  /**
   * Valide le formulaire et exécute la fonction handleClickValidForm
   * si le formulaire est valide.
   * @return void
   */
  async function handleValidate(event: Event) {
    event.preventDefault()
    const {valid} = await form.value.validate()
    valid && emit('validate')
  }
</script>

<template>
  <VCard
    :loading="loading"
    :subtitle="subtitle"
    :title="title"
    :aria-label="title"
    :width="width"
  >
    <VBtn
      v-if="closable"
      aria-label="Close"
      variant="plain"
      icon="mdi-close"
      @click="emit('cancel', 'close')"
      class="ma-1 position-absolute"
    />
    <VCardText>
      <VForm
        ref="form"
        :disabled="loading || afterClickLoading"
        @keydown.enter.capture.stop="handleValidate"
      >
        <slot />
      </VForm>
    </VCardText>
    <VCardActions class="pa-4">
      <slot
        name="actions"
        :validate="handleValidate"
        :loading="afterClickLoading"
      >
        <VBtn
          @click="emit('cancel', 'btn')"
          :text="btnAnnuler?.libelle || 'Annuler'"
          :disabled="btnAnnuler?.disabled"
        />
        <VBtn
          :loading="afterClickLoading"
          variant="flat"
          color="primary"
          @click="handleValidate"
          :text="btnValider?.libelle || 'Valider'"
          :disabled="btnValider?.disabled"
        />
      </slot>
    </VCardActions>
  </VCard>
</template>

<style scoped>
  .position-absolute {
    top: 0;
    right: 0;
  }
</style>
