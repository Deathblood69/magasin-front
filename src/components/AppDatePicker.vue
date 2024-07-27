<script lang="ts" setup>
  import {format, parse} from 'date-fns'

  /** === PROPS === */

  interface Props {
    label: string
    formatDate: (value: string) => Date
    parseDate: (value: Date) => string
  }

  const props = defineProps<Props>()

  const dateString = defineModel<string>({required: true})

  /** === COMPUTED === */

  /**
   * Permet d'afficher la ref du composant parent dans le VTextField
   */
  const date = computed(() => {
    if (dateString.value) {
      const date = props.formatDate(dateString.value)
      return format(date, 'yyyy-MM-dd')
    }
  })

  /** === METHODES === */

  /**
   * Permet de mettre à jour dans la ref dans le composant parent depuis VTextField
   * @param value
   */
  function handleUpdate(value: string) {
    if (value) {
      const date = parse(value, 'yyyy-MM-dd', new Date())
      dateString.value = props.parseDate(date)
    }
  }
</script>

<template>
  <VTextField
    :label="label"
    :model-value="date"
    @update:model-value="handleUpdate"
    density="compact"
    type="date"
  />
</template>

<style scoped></style>
