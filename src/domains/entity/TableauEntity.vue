<script lang="ts" setup generic="T extends AbstractEntity">
  import {DATATABLE_HEADERS} from '~/constants/dataTableHeaders'
  import {ROLES} from '~/constants/roles.const'
  import {useEntityStore} from '~/domains/entity/entity.store'
  import {ENTITIES} from '~/constants/entities'
  import type {AbstractEntity} from '~/types/entity'
  import {useSnackbarStore} from '~/stores/snackbar.store'

  interface Props {
    entity: ENTITIES
    defaultEntity: Omit<T, 'id'>
  }

  const props = defineProps<Props>()

  type Emit = {
    openForm: [boolean]
  }

  const emit = defineEmits<Emit>()

  const storeEntity = useEntityStore<T>(props.entity)
  const {
    data: entities,
    length,
    selected: selectedEntity
  } = storeToRefs(storeEntity)
  const {refreshData} = storeEntity

  const {openSnackbar} = useSnackbarStore()

  const afterClickLoading = ref(false)

  function openDialogCreate() {
    selectedEntity.value = JSON.parse(JSON.stringify(props.defaultEntity))
    emit('openForm', true)
  }

  function openDialogEdit(entity: T) {
    selectedEntity.value = JSON.parse(JSON.stringify(entity))
    emit('openForm', true)
  }

  function openDialogDelete(entity: T) {
    // TODO: Supprimer
  }

  function closeDialog() {
    emit('openForm', false)
  }

  /**
   * Gère l'événement de clic pour un formulaire valide.
   *
   * @return {void} Aucune valeur de retour.
   */
  const handleValider = () => {
    // TODO: Valider
    // // Active le chargement après le clic
    // afterClickLoading.value = true
    // // Effectue la requête HTTP
    // useFetchService(PATHS_API.produit, {
    //   method: METHODE_HTTP.POST,
    //   body: produit.value,
    //   onResponse(context: FetchServiceResponse) {
    //     if (context.response.ok) {
    //       openSnackbar('Enregistrement reussi')
    //       open.value = false
    //       emit('change')
    //     } else if (context.response.status === 409) {
    //       const responseData = context.response._data as
    //         | {
    //             message: string
    //             statusCode: number
    //           }
    //         | undefined
    //       if (responseData?.message.includes('Produit - produitname')) {
    //         openSnackbar('Identifiant utilisateur déjà utilisé.', {
    //           color: 'error'
    //         })
    //       } else {
    //         getLastProfilError(context, true)
    //       }
    //     } else {
    //       // Affiche une notification d'erreur
    //       openSnackbar("Erreur lors de l'enregistrement de l'utilisateur", {
    //         color: 'error'
    //       })
    //     }
    //   }
    // }).finally(() => {
    //   afterClickLoading.value = false
    // })
  }
</script>

<template>
  <VCard width="95%">
    <VCardTitle class="text-right">
      <VBtn
        color="primary"
        prepend-icon="mdi-plus"
        text="Ajouter"
        variant="flat"
        @click="openDialogCreate"
      />
    </VCardTitle>
    <VCardText>
      <AppDataTable
        v-if="entities"
        :headers="DATATABLE_HEADERS[entity as keyof typeof DATATABLE_HEADERS]"
        :items-length="length"
        :items="entities"
      >
        <template #actions="{item: entity}">
          <VBtnGroup>
            <VBtn
              aria-label="edit"
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click="openDialogEdit(entity)"
              title="Modifier"
            />
            <VBtn
              aria-label="delete"
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="openDialogDelete(entity)"
              title="Supprimer"
            />
          </VBtnGroup>
        </template>
        <template #roles="{value}">
          <VChip
            v-for="role in value"
            :key="role"
          >
            {{ ROLES[role].title }}
          </VChip>
        </template>
      </AppDataTable>
    </VCardText>
  </VCard>
  <slot
    name="dialog"
    :props="{refreshData, selectedEntity, closeDialog}"
    @valider="handleValider"
  ></slot>
</template>

<style scoped></style>
