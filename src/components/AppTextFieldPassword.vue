<script setup lang="ts">

  /** === PROPS === */

  const password = defineModel<string>({required: true})

  /** === REFS === */

  const passwordVisible = ref(false)

  /** === COMPUTED === */

  // Computed pour afficher l'icône du champ password.
  const computedIconPassword = computed(() =>
    passwordVisible.value ? 'mdi-eye' : 'mdi-eye-off',
  )
</script>

<template>
  <VTextField
    v-model="password"
    :type="passwordVisible ? 'text' : 'password'"
    aria-label="Mot de passe"
    label="Mot de passe"
  >
    <template v-slot:append-inner>
      <VIcon
        :icon="computedIconPassword"
        @click="passwordVisible = !passwordVisible"
      />
    </template>
  </VTextField>
</template>

<style scoped></style>
