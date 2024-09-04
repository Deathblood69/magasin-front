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
    course?: Course
  }

  const props = defineProps<Props>()

  type Emits = {
    valider: []
    annuler: []
  }

  const emit = defineEmits<Emits>()

  const achatStore = useEntityStore<Achat>(ENTITIES.achat)
  const {sauvegarderEntity, refreshData} = achatStore
  const {selected, entities} = storeToRefs(achatStore)

  const produitsStore = useEntityStore<Produit>(ENTITIES.produit)
  const {entities: produits} = storeToRefs(produitsStore)

  const formAchat = ref<Achat>(JSON.parse(JSON.stringify(DEFAULT_ACHAT)))

  const achats = ref<Achat[]>([])

  onBeforeMount(async () => {
    await refreshData()
    if (props.course?.id && entities.value) {
      achats.value = entities.value.filter((e) => e.course === props.course?.id)
    }
  })

  function findProduitNameById(achat: Achat) {
    return produits.value?.find((e) => e.id === achat.produit)?.nom
  }

  async function handleAddAchat() {
    const index = achats.value.findIndex(
      (e) => e.produit === formAchat.value.produit
    ) as number
    if (index !== -1) {
      achats[index] = formAchat.value
    } else {
      achats.value.push(formAchat.value)
    }
    formAchat.value = JSON.parse(JSON.stringify(DEFAULT_ACHAT))
  }

  async function handleDeleteAchat(item: Achat) {
    achats.value = achats.value.filter((e) => e.produit !== item.produit)
    formAchat.value = JSON.parse(JSON.stringify(DEFAULT_ACHAT))
  }

  function handleEditAchat(item: Achat) {
    formAchat.value = item
  }

  async function handleValider() {
    for (const achat of achats.value) {
      selected.value = {
        ...achat,
        course: props.course?.id ?? ''
      }
      await sauvegarderEntity()
    }
    emit('valider')
  }

  function handleAnnuler() {
    emit('annuler')
  }
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex justify-center">
      {{ course ? `Achats de ${course?.nom}` : 'Achats' }}
    </VCardTitle>
    <VCardText>
      <VContainer class="d-flex flex-row">
        <FormAchat
          v-if="produits"
          v-model="formAchat"
          :produits="produits as Produit[]"
        />
        <VBtn
          icon="mdi-plus"
          color="primary"
          variant="flat"
          size="small"
          rounded="0"
          @click="handleAddAchat"
        />
        <VBtn
          icon="mdi-delete"
          size="small"
          rounded="0"
          @click="handleDeleteAchat"
        />
      </VContainer>
      <AppDataTable
        v-if="entities"
        :headers="achatHeaders"
        :items="achats"
        :itemsLength="achats.length"
      >
        <template #produit="{item}"> {{ findProduitNameById(item) }}</template>
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
      </AppDataTable>
    </VCardText>
    <VCardActions class="d-flex justify-center">
      <VBtn
        variant="flat"
        color="primary"
        @click="handleValider"
      >
        Valider
      </VBtn>
      <VBtn @click="handleAnnuler">Annuler</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped></style>
