<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/constants/entities'
  import {DEFAULT_UTILISATEUR} from '~/domains/utilisateur/utilisateurDefault.const'
  import type {Utilisateur} from '~/domains/utilisateur/utilisateur'
  import FormUtilisateur from '~/domains/utilisateur/FormUtilisateur.vue'
  import {ROLES} from '~/constants/roles.const'
</script>

<template>
  <TableauEntity
    titre="Utilisateurs"
    :entity="ENTITIES.utilisateur"
    :default-entity="DEFAULT_UTILISATEUR"
  >
    <template #roles="{value}">
      <VChip
        v-for="role in value"
        :key="role"
      >
        {{ ROLES[role].title }}
      </VChip>
    </template>
    <template #form="{props}">
      <FormUtilisateur
        v-model="props.selectedEntity as Utilisateur"
        :type-utilisateurs="Object.values(ROLES)"
      />
    </template>
    <template #messageDelete>
      {{ 'Voulez-vous supprimer cet utilisateur ?' }}
    </template>
  </TableauEntity>
</template>

<style scoped></style>
