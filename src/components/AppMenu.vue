<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
  /** === PROPS === */

  interface Props {
    disabled?: boolean
  }

  defineProps<Props>()

  const open = defineModel<boolean>({default: false})

  function handleToggleMenu() {
    open.value = !open.value
  }
</script>

<template>
  <VMenu
    v-model="open"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{props}">
      <VBtn
        :disabled="disabled"
        @click="handleToggleMenu"
        v-bind="props"
      >
        <slot name="button" />
      </VBtn>
    </template>
    <slot />
  </VMenu>
</template>
