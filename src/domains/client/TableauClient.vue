<script lang="ts" setup>
  import {DATATABLE_HEADERS} from '~/constants/dataTableHeaders'
  import type {Client} from './client'
  import {ROLES} from '~/constants/roles.const'
  import {DEFAULT_CLIENT_CONSTANTS} from '~/domains/client/clientDefault.const'
  import DialogClient from '~/domains/client/DialogClient.vue'
  import {useClientStore} from '~/domains/client/client.store'

  const clientStore = useClientStore()
  const {selectedClient, clients, clientsLength} = storeToRefs(clientStore)
  const {refresh} = clientStore

  const dialogs = ref({
    client: false
  })

  function openCreateClient() {
    selectedClient.value = JSON.parse(JSON.stringify(DEFAULT_CLIENT_CONSTANTS))
    dialogs.value.client = true
  }

  function openEditClient(client: Client) {
    selectedClient.value = JSON.parse(JSON.stringify(client))
    dialogs.value.client = true
  }

  function openDeleteClient(client: Client) {}
</script>

<template>
  <VCard width="95%">
    <VCardTitle class="text-right">
      <VBtn
        color="primary"
        prepend-icon="mdi-plus"
        text="Ajouter"
        variant="flat"
        @click="openCreateClient"
      />
    </VCardTitle>
    <VCardText>
      <AppDataTable
        v-if="clients"
        :headers="DATATABLE_HEADERS.client"
        :items-length="clientsLength"
        :items="clients"
      >
        <template #actions="{item: client}">
          <VBtnGroup>
            <VBtn
              aria-label="edit"
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click="openEditClient(client)"
              title="Modifier"
            />
            <VBtn
              aria-label="delete"
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="openDeleteClient(client)"
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
  <DialogClient
    v-if="selectedClient"
    v-model:open="dialogs.client"
    v-model:client="selectedClient"
    @change="refresh"
  />
</template>

<style scoped></style>
