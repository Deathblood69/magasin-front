<script setup lang="ts">
  import type {Benefice} from '~/domains/benefice/benefice'

  interface Props {
    benefice?: Benefice
  }

  const props = defineProps<Props>()

  const valeurBenefice = computed(() => {
    if (props.benefice) {
      return props.benefice.benefice
    } else {
      return 0
    }
  })

  const styleBenefice = computed(() => {
    if (valeurBenefice.value < 0) {
      return 'color:red'
    } else if (valeurBenefice.value > 0) {
      return 'color:green'
    } else {
      return ''
    }
  })
</script>

<template>
  <VChip :style="styleBenefice">{{ valeurBenefice }}{{ '€' }} </VChip>
</template>

<style scoped></style>
