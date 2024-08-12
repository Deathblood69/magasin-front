<script lang="ts" setup generic="T extends AbstractEntity">
  import type {AbstractEntity} from '~/types/entity'

  /**  PROPS  **/

  const entity = defineModel<T | Omit<T, 'id'>>('entity', {
    required: true
  })

  const open = defineModel<boolean>('open', {
    required: true
  })

  interface Props {
    title: string
  }

  defineProps<Props>()

  /**  EMITS  **/
  type Emits = {
    open: [boolean]
    change: []
    valider: []
  }
  const emit = defineEmits<Emits>()

  /**  REFS  **/

  const subTitle = computed(() => {
    return 'id' in entity && entity.id ? 'Modification' : 'Création'
  })

  /**  METHODS  **/
  /**
   * Réinitialise les valeurs de l'utilisateur et ferme le formulaire.
   */
  const handleCancel = () => {
    open.value = false
  }

  function handleValider() {
    emit('valider')
  }
</script>

<template>
  <AppDialog
    v-model="open"
    width="500"
  >
    <AppFormLayout
      :subtitle="subTitle"
      :title="title"
      @cancel="handleCancel"
      @validate="handleValider"
    >
      <slot />
    </AppFormLayout>
  </AppDialog>
</template>

<style scoped></style>
