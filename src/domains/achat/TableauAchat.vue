<script lang="ts" setup>
  import {ENTITIES} from '~/domains/entities'
  import {useEntityStore} from '~/domains/entity/entity.store'
  import type {Course} from '~/domains/course/course'
  import {achatHeaders} from '~/domains/achat/achatHeaders'
  import type {Produit} from '~/domains/produit/produit'
  import FormAchat from '~/domains/achat/FormAchat.vue'
  import type {Achat} from '~/domains/achat/achat'
  import {DEFAULT_ACHAT} from '~/domains/achat/achatDefault.const'

  interface Props {
    course: Course
  }

  const props = defineProps<Props>()

  const produitsStore = useEntityStore<Produit>(ENTITIES.produit)
  const {entities: produits} = storeToRefs(produitsStore)

  const achatsStore = useEntityStore<Achat>(ENTITIES.achat)
  const {selected: selectedAchat, entities: achats} = storeToRefs(achatsStore)
  const {refreshData, sauvegarderEntity, supprimerEntity} = achatsStore

  const achatForm = ref<Achat>(JSON.parse(JSON.stringify(DEFAULT_ACHAT)))

  const filteredAchats = computed(() => {
    return (
      achats.value?.filter((achat) => achat.course === props.course.id) ?? []
    )
  })

  const filteredProduits = computed(() => {
    return produits.value?.filter(
      (produit) =>
        !filteredAchats.value.some((achat) => achat.produit === produit.id)
    )
  })

  function resetForm() {
    achatForm.value = JSON.parse(JSON.stringify(DEFAULT_ACHAT))
  }

  function handleFindProduit(id: string) {
    return produits.value?.find((e) => e.id === id)?.nom
  }

  async function handleAddAchat() {
    selectedAchat.value = {
      id: '',
      course: props.course.id,
      produit: achatForm.value.produit,
      prix: achatForm.value.prix,
      stock: achatForm.value.stock
    }
    await sauvegarderEntity()
    await refreshData()
    resetForm()
  }

  async function handleDeleteAchat(item: Achat) {
    selectedAchat.value = item
    await supprimerEntity()
    await refreshData()
    resetForm()
  }

  function handleEditAchat(item: Achat) {
    achatForm.value = {
      ...item,
      produit: handleFindProduit(item.produit) ?? item.produit
    }
  }
</script>

<template>
  <div class="d-flex flex-row">
    <FormAchat
      v-if="filteredProduits"
      v-model="achatForm"
      :produits="filteredProduits"
    />
    <VBtn
      color="primary"
      icon="mdi-plus"
      rounded="0"
      size="small"
      @click="handleAddAchat"
    />
  </div>
  <AppDataTableVirtual
    :headers="achatHeaders"
    :items="filteredAchats"
  >
    <template #produit="{value}">
      {{ handleFindProduit(value) }}
    </template>
    <template #stock="{value}">
      <VChip>
        {{ value }}
      </VChip>
    </template>
    <template #prix="{value}">
      <VChip>
        {{ `${value}€` }}
      </VChip>
    </template>
    <template #actions="{item}">
      <VBtnGroup>
        <VBtn
          aria-label="edit"
          icon="mdi-pencil"
          size="small"
          variant="text"
          @click="handleEditAchat(item)"
          title="Modifier"
        />
        <VBtn
          aria-label="delete"
          icon="mdi-delete"
          size="small"
          variant="text"
          @click="handleDeleteAchat(item)"
          title="Supprimer"
        />
      </VBtnGroup>
    </template>
  </AppDataTableVirtual>
</template>

<style scoped></style>
