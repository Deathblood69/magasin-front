<script lang="ts" setup>
  import type {Utilisateur} from './utilisateur'
  import {VALIDATIONS_RULES} from '~/constants/validationsRules.const'
  import type {RoleInterface} from '~/types/role'

  /** === PROPS === */

  interface Props {
    typeUtilisateurs: RoleInterface[]
  }

  defineProps<Props>()

  const model = defineModel<Utilisateur | Omit<Utilisateur, 'id'>>({
    required: true
  })

  const passwordVisible = ref(false)
  const passwordConfirmation = ref('')

  /** === COMPUTED === */

  const computedIconPassword = computed(() =>
    passwordVisible.value ? 'mdi-eye' : 'mdi-eye-off'
  )

  const validatePasswordConfirmation = () => {
    if (
      model.value.password &&
      model.value.password !== passwordConfirmation.value
    ) {
      return 'Les mots de passe ne correspondent pas.'
    }
    return true
  }

  /**
   * Met à jour le nom d'utilisateur en minuscule.
   * Met à jour le nom et le prénom en majuscule.
   */
  const handleUserInput = () => {
    model.value.username = model.value.username.toLowerCase()
    model.value.firstName =
      model.value.firstName.charAt(0).toUpperCase() +
      model.value.firstName.slice(1).toLowerCase()
    model.value.lastName = model.value.lastName.toUpperCase()
  }
</script>

<template>
  <VTextField
    id="lastName-field"
    v-model="model.lastName"
    :rules="[VALIDATIONS_RULES.required, VALIDATIONS_RULES.nameFormat]"
    label="Nom"
    test-id="lastName"
    @input="handleUserInput"
  />
  <VTextField
    id="firstName-field"
    v-model="model.firstName"
    :rules="[VALIDATIONS_RULES.required, VALIDATIONS_RULES.nameFormat]"
    label="Prénom"
    test-id="prenom"
    @input="handleUserInput"
  />
  <VTextField
    id="username-field"
    ref="usernameField"
    v-model.trim="model.username"
    :rules="[VALIDATIONS_RULES.annudefFormat]"
    label="Identifiant"
    test-id="identifiant"
    @input="handleUserInput"
  />
  <VTextField
    id="password-field"
    v-model="model.password"
    :rules="[VALIDATIONS_RULES.passwordValid]"
    :type="passwordVisible ? 'text' : 'password'"
    data-testid="pwd"
    label="Mot de passe"
  >
    <template v-slot:append-inner>
      <VIcon
        :icon="computedIconPassword"
        @click="passwordVisible = !passwordVisible"
      />
    </template>
  </VTextField>
  <VTextField
    id="passwordConfirmation-field"
    v-model="passwordConfirmation"
    :rules="[validatePasswordConfirmation]"
    :type="passwordVisible ? 'text' : 'password'"
    data-testid="pwdVerif"
    label="Confirmer le mot de passe"
  >
    <template v-slot:append-inner>
      <VIcon
        :icon="computedIconPassword"
        @click="passwordVisible = !passwordVisible"
      />
    </template>
  </VTextField>
  <AppSelect
    id="typeUtilisateur"
    label="Type de utilisateur"
    v-model="model.roles"
    :items="typeUtilisateurs"
    :rules="[VALIDATIONS_RULES.notEmpty]"
    density="default"
  />
</template>

<style scoped></style>
