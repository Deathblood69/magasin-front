<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/domains/entities'
  import {courseHeaders} from '~/domains/course/courseHeaders'
  import {DEFAULT_COURSE} from '~/domains/course/courseDefault.const'
  import type {Course} from '~/domains/course/course'
  import FormCourse from '~/domains/course/FormCourse.vue'
</script>

<template>
  <TableauEntity
    titre="Produits"
    :entity="ENTITIES.course"
    :default-entity="DEFAULT_COURSE"
    :headers="courseHeaders"
  >
    <template #form="{props}">
      <FormCourse v-model="props.selectedEntity as Course" />
    </template>
    <template #messageDelete>
      {{ 'Voulez-vous supprimer cette course ?' }}
    </template>
  </TableauEntity>
</template>

<style scoped></style>
