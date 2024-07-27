<script lang="ts" setup>
  import {capitalize} from 'vue'
  import {useAuthStore} from '~/stores/auth.store'
  import type {LienMenuInterface} from '~/types/lienMenu'
  import {PAGES} from '~/constants/pages.const'

  /** === PROPS === */

  /** Define props : modelValue est lié au v-model parent */
  interface Props {
    modelValue: boolean
    liens: LienMenuInterface[]
    temporary: boolean
  }

  const props = defineProps<Props>()

  /** === EMITS === */

  /** Définition d'un évènement permettant de mettre à jour le modèle */
  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
  }>()

  /** === COMPUTED === */

  /** Computed pour la visibilité du drawer */
  const computedDrawerVisible = computed({
    get: () => props.modelValue,
    set: (newValue) => {
      emit('update:modelValue', newValue)
    },
  })

  /** === METHODES === */
</script>

<template>
  <VNavigationDrawer
    class="position-fixed"
    color="drawer"
    v-model="computedDrawerVisible"
    role="menu"
    :temporary="temporary"
  >
    <VImg
      src="~/assets/images/logo.svg"
      max-height="150px"
    />
    <VList class="spacer pt-10">
      <VListItem
        v-for="{title, to, icon} in liens"
        :key="to"
        :prepend-icon="icon"
        :to="to"
        role="menuitem"
      >
        {{ capitalize(title) }}
      </VListItem>
    </VList>
    <template #append>
      <slot name="append" />
    </template>
  </VNavigationDrawer>
</template>

<style scoped>
  .spacer {
    border-top: white 1px solid;
    margin: 20px 5px 0;
  }
</style>
