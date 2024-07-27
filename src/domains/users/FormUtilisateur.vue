<script lang="ts" setup>
  import type {UserInterface} from '~/types/user'
  import {useSnackbarStore} from '~/stores/snackbar.store'
  import {PATHS_API} from '~/constants/pathsAPI.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.const'
  import FormUser from '~/domains/users/FormUser.vue'
  import {DEFAULT_USER_CONSTANTS} from '~/domains/users/utilisateurDefault.const'
  import type {FetchServiceResponse} from '~/types/fetchServiceResponse'
  import {getLastProfilError} from '~/utils/getLastProfilError'

  /**  PROPS  **/
  interface Props {
    user: UserInterface | Omit<UserInterface, 'id'>
    open: boolean
  }

  const props = defineProps<Props>()

  /**  EMITS  **/
  type Emits = {
    'update:user': [UserInterface | Omit<UserInterface, 'id'>]
    'update:open': [boolean]
    change: []
  }
  const emit = defineEmits<Emits>()

  /**  REFS  **/
  const afterClickLoading = ref(false)
  const {openSnackbar} = useSnackbarStore()

  /**  COMPUTED  **/
  const userToChange = computed({
    get: () => props.user,
    set: (newUser) => emit('update:user', newUser),
  })

  const openComputed = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value),
  })

  const subTitle = computed(() => {
    return 'id' in props.user && props.user.id ? 'Modification' : 'Création'
  })

  /** FETCH **/
  /**
   * Gère l'événement de clic pour un formulaire valide.
   *
   * @return {void} Aucune valeur de retour.
   */
  const handleClickValidForm = () => {
    // Active le chargement après le clic
    afterClickLoading.value = true
    // Effectue la requête HTTP
    useFetchService(PATHS_API.user, {
      method: METHODE_HTTP.POST,
      body: userToChange.value,
      onResponse(context: FetchServiceResponse) {
        if (context.response.ok) {
          openSnackbar('Enregistrement reussi')
          openComputed.value = false
          emit('change')
        } else if (context.response.status === 409) {
          const responseData = context.response._data as
            | {
                message: string
                statusCode: number
              }
            | undefined
          if (responseData?.message.includes('User - username')) {
            openSnackbar('Identifiant utilisateur déjà utilisé.', {
              color: 'error',
            })
          } else {
            getLastProfilError(context, true)
          }
        } else {
          // Affiche une notification d'erreur
          openSnackbar("Erreur lors de l'enregistrement de l'utilisateur", {
            color: 'error',
          })
        }
      },
    }).finally(() => {
      afterClickLoading.value = false
    })
  }

  /**  METHODS  **/
  /**
   * Réinitialise les valeurs de l'utilisateur et ferme le formulaire.
   */
  const handleClickCancelForm = () => {
    userToChange.value = DEFAULT_USER_CONSTANTS
    openComputed.value = false
  }
</script>

<template>
  <AppDialog
    v-model="openComputed"
    width="500"
  >
    <AppFormLayout
      :subtitle="subTitle"
      title="Utilisateur"
      @cancel="handleClickCancelForm"
      @validate="handleClickValidForm"
    >
      <FormUser v-model="userToChange" />
    </AppFormLayout>
  </AppDialog>
</template>

<style scoped></style>
