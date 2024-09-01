<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/domains/entities'
  import {courseHeaders} from '~/domains/course/courseHeaders'
  import {DEFAULT_COURSE} from '~/domains/course/courseDefault.const'
  import type {Course} from '~/domains/course/course'
  import FormCourse from '~/domains/course/FormCourse.vue'
  import ChipBenefice from '~/domains/benefice/ChipBenefice.vue'
  import {useBeneficeStore} from '~/domains/benefice/benefice.store'

  const {findBeneficeByCourse} = useBeneficeStore()
</script>

<template>
  <TableauEntity
    titre="Courses"
    :entity="ENTITIES.course"
    :default-entity="DEFAULT_COURSE"
    :headers="courseHeaders"
  >
    <template #benefice="{item}">
      <ChipBenefice :benefice="findBeneficeByCourse(item)" />
    </template>
    <template #form="{props}">
      <FormCourse v-model="props.selectedEntity as Course" />
    </template>
    <template #messageDelete>
      {{ 'Voulez-vous supprimer cette course ?' }}
    </template>
  </TableauEntity>
</template>

<style scoped></style>
