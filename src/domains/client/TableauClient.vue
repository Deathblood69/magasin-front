<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/constants/entities'
  import {DEFAULT_CLIENT} from '~/domains/client/clientDefault.const'
  import type {Client} from '~/domains/client/client'
  import FormClient from '~/domains/client/FormClient.vue'
</script>

<template>
  <TableauEntity
    titre="Clients"
    :entity="ENTITIES.client"
    :default-entity="DEFAULT_CLIENT"
  >
    <template #form="{props}">
      <FormClient v-model="props.selectedEntity as Client" />
    </template>
  </TableauEntity>
</template>

<style scoped></style>
