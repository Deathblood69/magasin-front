<script lang="ts" setup generic="T extends AbstractEntity">
  import {ENTITIES} from '~/domains/entities'
  import type {AbstractEntity} from '~/types/entity'
  import DeleteDialog from '~/domains/entity/DeleteDialog.vue'
  import FormEntity from '~/domains/entity/FormEntity.vue'
  import {useEntityStore} from '~/domains/entity/entity.store'
  import type {AppDataTableHeaders} from '~/types/headers'

  interface Props {
    titre: string
    entity: ENTITIES
    defaultEntity: Omit<T, 'id'>
    headers: AppDataTableHeaders
  }

  const props = defineProps<Props>()

  const storeEntity = useEntityStore<T>(props.entity)
  const {
    entities: entities,
    length,
    selected: selectedEntity
  } = storeToRefs(storeEntity)
  const {refreshData, setSelected, sauvegarderEntity, supprimerEntity} =
    storeEntity

  const openDialog = ref<boolean>(false)

  const deleteDialog = ref<boolean>(false)

  const keys = computed(() => {
    return props.headers?.map((header) => header.key) || []
  })

  onBeforeMount(() => {
    refreshData()
  })

  function openDialogCreate() {
    setSelected(props.defaultEntity)
    openDialog.value = true
  }

  function openDialogEdit(entity: T) {
    setSelected(entity)
    openDialog.value = true
  }

  function openDialogDelete(entity: T) {
    setSelected(entity)
    deleteDialog.value = true
  }

  function closeDialog() {
    openDialog.value = false
  }

  function handleValider() {
    sauvegarderEntity()
    closeDialog()
  }

  function handleSupprimer() {
    supprimerEntity()
    closeDialog()
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
        :headers="headers"
        :items-length="length"
        :items="entities"
      >
        <template
          v-for="key in keys"
          v-slot:[`${key}`]="props"
        >
          <slot v-if="key === 'actions'">
            <VBtnGroup>
              <VBtn
                aria-label="edit"
                icon="mdi-pencil"
                size="small"
                variant="text"
                @click="openDialogEdit(props.item)"
                title="Modifier"
              />
              <VBtn
                aria-label="delete"
                icon="mdi-delete"
                size="small"
                variant="text"
                @click="openDialogDelete(props.item)"
                title="Supprimer"
              />
            </VBtnGroup>
          </slot>
          <slot
            v-else
            :name="key"
            v-bind="props"
          />
        </template>
      </AppDataTable>
    </VCardText>
  </VCard>
  <FormEntity
    v-if="selectedEntity"
    :title="titre"
    v-model:entity="selectedEntity as T"
    v-model:open="openDialog"
    @change="refreshData"
    @valider="handleValider"
  >
    <slot
      name="form"
      :props="{refreshData, selectedEntity, closeDialog}"
    />
  </FormEntity>
  <DeleteDialog
    v-model="deleteDialog"
    @valider="handleSupprimer"
  >
    <slot name="messageDelete">
      {{ 'Voulez-vous supprimer cet élément ?' }}
    </slot>
  </DeleteDialog>
</template>

<style scoped></style>
