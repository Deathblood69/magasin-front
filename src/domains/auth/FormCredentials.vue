<script lang="ts" setup>
  import type {CredentialsInterface} from '~/types/credentials'
  import {VALIDATIONS_RULES} from '~/constants/validationsRules.const'
  import {isDevelopment} from 'std-env'
  import {getDevModeProfils} from '~/utils/getDevModeProfils'
  import {useAuthStore} from '~/stores/auth.store'
  import AppTextFieldPassword from '~/components/AppTextFieldPassword.vue'

  /** === PROPS === */

  interface Props {
    modelValue: CredentialsInterface
  }

  const props = defineProps<Props>()

  /** === EMITS === */

  type Emits = {
    'update:modelValue': [value: CredentialsInterface]
    errorConnection: []
  }

  const emit = defineEmits<Emits>()

  /** === REFS === */

  const authStore = useAuthStore()

  const isDev = ref(isDevelopment)
  const openNewError = ref(true)

  /** === COMPUTED === */

  const user = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  // Computed pour afficher le message d'erreur de connexion.
  const computedErrorMessage = computed(() => {
    if (!authStore.pending) {
      openNewError.value = true
    }
    return (
      (['401', '404'].some((code) => authStore.error?.message.includes(code)) &&
        'Veuillez saisir des identifiants valides svp.') ||
      (authStore.error?.message.includes('406') &&
        'Votre compte est bloqué !  Veuillez réessayer dans 20 minutes.')
    )
  })
</script>

<template>
  <VCheckbox
    v-if="isDevelopment"
    v-model="isDev"
    label="Mode Développement"
  />
  <VTextField
    v-if="!isDev"
    v-model="user.username"
    :rules="[VALIDATIONS_RULES.required]"
    aria-label="Identifiant"
    label="Identifiant"
  />

  <AppTextFieldPassword
    v-if="!isDev"
    v-model="user.password"
    :rules="[VALIDATIONS_RULES.required]"
    aria-label="Mot de passe"
    label="Mot de passe"
  />

  <VSelect
    v-if="isDev"
    v-model="user"
    :items="getDevModeProfils()"
    :return-object="true"
    aria-label="Profils"
    item-title="username"
    label="Profil"
  />

  <VAlert
    v-if="computedErrorMessage"
    v-model="openNewError"
    :closable="true"
    :text="computedErrorMessage"
    density="compact"
    title="Erreur connexion"
    type="error"
    variant="outlined"
  />
</template>
