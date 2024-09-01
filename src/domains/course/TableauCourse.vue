<script lang="ts" setup>
  import TableauEntity from '~/domains/entity/TableauEntity.vue'
  import {ENTITIES} from '~/domains/entities'
  import {courseHeaders} from '~/domains/course/courseHeaders'
  import {DEFAULT_COURSE} from '~/domains/course/courseDefault.const'
  import type {Course} from '~/domains/course/course'
  import FormCourse from '~/domains/course/FormCourse.vue'
  import ChipBenefice from '~/domains/benefice/ChipBenefice.vue'
  import {useBeneficeStore} from '~/domains/benefice/benefice.store'
  import TableauAchat from '~/domains/achat/TableauAchat.vue'

  const {findBeneficeByCourse, refresh} = useBeneficeStore()

  const selectedCourse = ref<Course>()

  const openDialogAchat = ref<boolean>(false)

  function toggleDialogAchats(item?: Course) {
    if (item) {
      selectedCourse.value = item
    }
    openDialogAchat.value = !openDialogAchat.value
  }

  async function handleCloseAchats() {
    await refresh()
    toggleDialogAchats()
  }
</script>

<template>
  <TableauEntity
    titre="Courses"
    :entity="ENTITIES.course"
    :default-entity="DEFAULT_COURSE"
    :headers="courseHeaders"
  >
    <template #date="{item}">
      {{ new Date(item.date).toLocaleDateString() }}
    </template>
    <template #benefice="{item}">
      <ChipBenefice :benefice="findBeneficeByCourse(item)" />
    </template>
    <template #actions="{item}">
      <VBtn
        aria-label="basket"
        icon="mdi-basket"
        size="small"
        variant="text"
        @click="toggleDialogAchats(item)"
        title="Supprimer"
      />
    </template>
    <template #form="{props}">
      <FormCourse v-model="props.selectedEntity as Course" />
    </template>
    <template #messageDelete>
      {{ 'Voulez-vous supprimer cette course ?' }}
    </template>
  </TableauEntity>
  <AppDialog v-model="openDialogAchat">
    <TableauAchat
      :course="selectedCourse"
      @valider="handleCloseAchats"
      @annuler="handleCloseAchats"
    />
  </AppDialog>
</template>

<style scoped></style>
