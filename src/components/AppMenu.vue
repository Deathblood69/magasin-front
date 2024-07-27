<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
  import type {MenuItem} from '~/types/menuItem'

  /** === PROPS === */

  interface Props {
    disabled?: boolean
  }

  const propsMenu = defineProps<Props>()
</script>

<template>
  <VBtn
    id="menu-activator"
    :disabled="disabled"
  >
    <slot name="button" />
  </VBtn>
  <VMenu
    activator="#menu-activator"
    :close-on-content-click="false"
  >
    <slot />
  </VMenu>
</template>
