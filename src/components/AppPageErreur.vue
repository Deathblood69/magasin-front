<script lang="ts" setup>
  /** === PROPS === */

  interface Props {
    titre: string
    message?: string
  }

  const props = defineProps<Props>()

  const pageNotFound = computed(() => {
    return props.message?.includes('Page not found')
  })

  const titrePage = computed(() => {
    return pageNotFound.value ? 'Page non trouvée' : 'Erreur'
  })

  const messagePage = computed(() => {
    return pageNotFound.value
      ? "La page que vous recherchez n'existe pas"
      : 'Une erreur est survenue lors du chargement de la page.'
  })

  /** === METHODES === */

  function goBack() {
    // Ajoutez le code pour revenir à la page précédente
    useRouter().go(-1)
  }
</script>

<template>
  <VContainer
    class="container"
    fill-height
    fluid
  >
    <VCard class="pa-5 rounded rounded-md">
      <VCardTitle class="titre center"
        ><h2>{{ titrePage }}</h2></VCardTitle
      >
      <VCardText class="center">
        <p>{{ messagePage }}</p>
      </VCardText>

      <VCardActions class="center">
        <VBtn
          color="primary"
          variant="flat"
          @click="goBack"
        >
          Page Précédente
        </VBtn>
      </VCardActions>
      <VCardText v-if="message && !pageNotFound">
        <VExpansionPanels ele>
          <VExpansionPanel
            :text="message"
            :title="titre"
          >
          </VExpansionPanel>
        </VExpansionPanels>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<style scoped>
  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .titre {
    padding: 1em;
  }

  .center {
    display: flex;
    justify-content: center;
  }
</style>
