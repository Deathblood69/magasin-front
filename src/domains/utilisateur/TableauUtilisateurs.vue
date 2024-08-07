<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/constants/entities'
  import {DEFAULT_UTILISATEUR} from '~/domains/utilisateur/utilisateurDefault.const'
  import type {Utilisateur} from '~/domains/utilisateur/utilisateur'
  import DialogEntity from '~/domains/entity/DialogEntity.vue'
  import FormUtilisateur from '~/domains/utilisateur/FormUtilisateur.vue'
  import {ROLES} from '~/constants/roles.const'

  const openDialog = ref<boolean>(false)

  function handleOpenForm(value: boolean) {
    openDialog.value = value
  }
</script>

<template>
  <TableauEntity
    :entity="ENTITIES.utilisateur"
    :default-entity="DEFAULT_UTILISATEUR"
    @openForm="handleOpenForm"
  >
    <template #dialog="{props}">
      <DialogEntity
        v-if="props.selectedEntity"
        title="Utilisateur"
        :default-entity="DEFAULT_UTILISATEUR"
        v-model:entity="props.selectedEntity as Utilisateur"
        v-model:open="openDialog"
        @change="props.refreshData"
      >
        <FormUtilisateur
          v-model="props.selectedEntity as Utilisateur"
          :type-utilisateurs="Object.values(ROLES)"
        />
      </DialogEntity>
    </template>
  </TableauEntity>
</template>

<style scoped></style>
