<script lang="ts" setup generic="T extends AbstractEntity">
  import {DATATABLE_HEADERS} from '~/constants/dataTableHeaders'
  import {useEntityStore} from '~/domains/entity/entity.store'
  import {ENTITIES} from '~/constants/entities'
  import type {AbstractEntity} from '~/types/entity'
  import DeleteDialog from '~/domains/entity/DeleteDialog.vue'
  import {DEFAULT_PRODUIT} from '~/domains/produit/produitDefault.const'
  import type {Produit} from '~/domains/produit/produit'
  import DialogEntity from '~/domains/entity/FormEntity.vue'

  interface Props {
    entity: ENTITIES
    defaultEntity: Omit<T, 'id'>
  }

  const props = defineProps<Props>()

  const storeEntity = useEntityStore<T>(props.entity)
  const {
    data: entities,
    length,
    selected: selectedEntity
  } = storeToRefs(storeEntity)
  const {refreshData, handleValider, handleSupprimer} = storeEntity

  const openDialog = ref<boolean>(false)

  const deleteDialog = ref<boolean>(false)

  const headers = computed(() => {
    return DATATABLE_HEADERS[props.entity as keyof typeof DATATABLE_HEADERS]
  })

  const keys = computed(() => {
    return headers?.value.map((header) => header.key) || []
  })

  function openDialogCreate() {
    selectedEntity.value = JSON.parse(JSON.stringify(props.defaultEntity))
    openDialog.value = true
  }

  function openDialogEdit(entity: T) {
    selectedEntity.value = JSON.parse(JSON.stringify(entity))
    openDialog.value = true
  }

  function openDialogDelete(entity: T) {
    selectedEntity.value = JSON.parse(JSON.stringify(entity))
    deleteDialog.value = true
  }

  function closeDialog() {
    openDialog.value = false
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
  <DialogEntity
    v-if="selectedEntity"
    title="Produit"
    :default-entity="DEFAULT_PRODUIT"
    v-model:entity="selectedEntity as Produit"
    v-model:open="openDialog"
    @change="refreshData"
    @valider="handleValider"
  >
    <slot
      name="form"
      :props="{refreshData, selectedEntity, closeDialog}"
    />
  </DialogEntity>
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
