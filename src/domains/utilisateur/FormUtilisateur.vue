<script lang="ts" setup>
  import type {Utilisateur} from './utilisateur'
  import {VALIDATIONS_RULES} from '~/constants/validationsRules.const'
  import type {RoleInterface} from '~/types/role'
  import {PATHS_API} from '~/constants/pathsAPI.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.const'

  /** === PROPS === */

  interface Props {
    typeUtilisateurs: RoleInterface[]
  }

  defineProps<Props>()

  const model = defineModel<Utilisateur | Omit<Utilisateur, 'id'>>({
    required: true
  })

  /** === REFS === */

  const usernameBeforeUpdate = ref(model.username)
  const passwordVisible = ref(false)
  const passwordConfirmation = ref('')
  const confirmIdentifiant = ref('id' in model)
  // const usernameUseAlready = ref(false)
  const usernameField = ref()

  /** === COMPUTED === */

  const path = computed(() => {
    return `${PATHS_API.utilisateur}/identifiant/${model.value.username}`
  })

  const computedIconPassword = computed(() =>
    passwordVisible.value ? 'mdi-eye' : 'mdi-eye-off'
  )

  //regles de validation de l'identifiant
  const rulesConfirmIdentifiant = computed(() => {
    return (
      confirmIdentifiant.value ||
      'Veuillez valider ou modifier la valeur du champ'
    )
  })

  //regles de verification d'unicite de l'identifiant
  const rulesUniqueIdentifiant = computed(() => {
    return (
      !usernameUseAlready.value ||
      "L'identifiant est déjà utilisé. Veuillez en choisir un autre."
    )
  })

  /** Requête qui retourne true ou false en si le nom d'utilisateur est déjà utilisé */
  const {
    data: usernameUseAlready,
    pending,
    execute: checkIdentifiant
  } = useFetchService(path, {
    method: METHODE_HTTP.GET,
    immediate: false,
    watch: false,
    transform: (value: string) => value === 'true'
  })

  /** === METHODES === */

  onMounted(() => {
    pending.value = false
  })

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

  /**
   * Génère un identifiant pour l'utilisateur s'il n'a ni nom d'utilisateur ni confirmation d'identifiant.
   * L'identifiant est créé en combinant le prénom et le nom de l'utilisateur en minuscules séparés par un point.
   */
  function propositionIdentifiant() {
    if (
      model.value.firstName &&
      model.value.lastName &&
      !model.value.username &&
      !confirmIdentifiant.value
    ) {
      model.value.username = `${model.value.firstName.toLowerCase()}.${model.value.lastName.toLowerCase()}`
    }
  }

  /**
   * Permet, lors d'un changement d'identifiant, de devoir revalider la modification.
   * (Permet aussi de regler les couleurs des messages en dessus du textfield)
   */
  function handleChangeIdentifiant() {
    confirmIdentifiant.value = false
  }

  /**
   * Confirme l'identifiant et valide le champ de nom d'utilisateur.
   */
  async function handleConfirmIdentifiant() {
    if (model.value.username !== usernameBeforeUpdate.value) {
      await checkIdentifiant()
    } else {
      usernameUseAlready.value = false
    }
    confirmIdentifiant.value = true
    await nextTick(() => {
      usernameField.value.validate()
      if (usernameUseAlready.value) {
        confirmIdentifiant.value = false
      }
    })
  }
</script>

<template>
  <VTextField
    id="lastName-field"
    v-model="user.lastName"
    :rules="[VALIDATIONS_RULES.required, VALIDATIONS_RULES.nameFormat]"
    label="Nom"
    test-id="lastName"
    @input="handleUserInput"
  />
  <VTextField
    id="firstName-field"
    v-model="user.firstName"
    :rules="[VALIDATIONS_RULES.required, VALIDATIONS_RULES.nameFormat]"
    label="Prénom"
    test-id="prenom"
    @input="handleUserInput"
  />
  <VTextField
    id="username-field"
    ref="usernameField"
    v-model.trim="user.username"
    :messages="confirmIdentifiant ? 'Identifiant valide' : ''"
    :rules="[
      VALIDATIONS_RULES.annudefFormat,
      rulesConfirmIdentifiant,
      rulesUniqueIdentifiant
    ]"
    label="Identifiant"
    test-id="identifiant"
    @input="handleUserInput"
    @update:focused="propositionIdentifiant"
    @update:model-value="handleChangeIdentifiant"
    :loading="pending"
  >
    <template v-slot:message="{message}">
      <div :class="confirmIdentifiant ? 'hint-username' : ''">
        {{ message }}
      </div>
    </template>
    <template v-slot:append>
      <VBtn
        :disabled="!user.username"
        class="iconValidateIdentifiant"
        color="primary"
        icon="mdi-check"
        size="large"
        v-bind="props"
        @click="handleConfirmIdentifiant"
      />
      <AppTooltip text="Valider l'identifiant" />
    </template>
  </VTextField>
  <VTextField
    id="password-field"
    v-model="user.password"
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
    v-model="model.typeUtilisateur"
    :items="typeUtilisateurs"
    :rules="[VALIDATIONS_RULES.notEmpty]"
    density="default"
  />
</template>

<style scoped></style>
