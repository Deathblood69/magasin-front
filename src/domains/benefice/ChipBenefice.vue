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
</script>

<template>
  <VChip :style="valeurBenefice > 0 ? 'color:green' : 'color:red'"
    >{{ valeurBenefice }}{{ '€' }}
  </VChip>
</template>

<style scoped></style>
