<script lang="ts" setup>
  import type {NuxtError} from '#app'

  /**  CONFIG  **/

  definePageMeta({
    layout: 'auth',
  })

  /**  PROPS  **/
  defineProps({
    error: Object as () => NuxtError,
  })
</script>

<template>
  <AppPageErreur
    :message="error?.message"
    titre="Détails de l'erreur"
  />
</template>
