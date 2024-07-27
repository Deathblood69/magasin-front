<script lang="ts" setup>
  import {DATATABLE_HEADERS} from '~/constants/dataTableHeaders'
  import type {UserInterface} from '~/types/user'
  import {MESSAGES} from '~/constants/messages.const'
  import {ROLES} from '~/constants/roles.const'
  import {DEFAULT_USER_CONSTANTS} from '~/domains/users/utilisateurDefault.const'
  import UserDialog from '~/domains/users/FormUtilisateur.vue'
  import {useUserStore} from '~/domains/users/utilisateur.store'

  const {user: connectedUser} = useAuthStore()

  const storeUser = useUserStore()
  const {selectedUser, users, usersLength} = storeToRefs(storeUser)
  const {refreshTable} = storeUser

  const dialogs = ref({
    user: false,
  })

  /**
   * Check si l'utilisateur est connecté.
   * @param {UserInterface} user - L'utilisateur connecté.
   */
  function isConnected(user: UserInterface) {
    return user.username === connectedUser?.username
  }

  function openCreateUser() {
    selectedUser.value = JSON.parse(JSON.stringify(DEFAULT_USER_CONSTANTS))
    dialogs.value.user = true
  }

  function openEditUser(user: UserInterface) {
    selectedUser.value = JSON.parse(JSON.stringify(user))
    dialogs.value.user = true
  }

  function openDeleteUser(user: UserInterface) {}
</script>

<template>
  <VCard width="95%">
    <VCardTitle class="text-right">
      <VBtn
        color="primary"
        prepend-icon="mdi-plus"
        text="Ajouter"
        variant="flat"
        @click="openCreateUser"
      />
    </VCardTitle>
    <VCardText>
      <AppDataTable
        :headers="DATATABLE_HEADERS.user"
        :items-length="usersLength"
        :items="users"
      >
        <template #actions="{item: user}">
          <VBtnGroup>
            <VBtn
              :disabled="isConnected(user)"
              aria-label="edit"
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click="openEditUser(user)"
              title="Modifier"
            />
            <VBtn
              :disabled="isConnected(user)"
              aria-label="delete"
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="openDeleteUser(user)"
              title="Supprimer"
            />
            <AppTooltip
              v-if="isConnected(user)"
              :text="MESSAGES.NO_SELF_UPDATE"
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
  <UserDialog
    v-if="selectedUser"
    v-model:open="dialogs.user"
    v-model:user="selectedUser"
    @change="refreshTable"
  />
</template>

<style scoped></style>
