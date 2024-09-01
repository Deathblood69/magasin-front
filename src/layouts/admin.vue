<script lang="ts" setup>
  import {useDisplay} from 'vuetify'
  import {LIENS_MENU} from '~/constants/liensMenu.const'
  import {PAGES} from '~/constants/pages.const'
  import {IMAGES} from 'assets/images/images'

  /**  CONFIG  **/

  const {app} = useRuntimeConfig()

  const router = useRouter()

  const {snackbar, icon} = storeToRefs(useSnackbarStore())

  /**  REFS  **/
  const {mobile} = useDisplay()

  const rail = ref(mobile.value)

  /**  COMPUTED  **/

  async function handleGoAccueil() {
    await router.push(PAGES.accueil)
  }

  function toggleRail() {
    rail.value = !rail.value
  }
</script>

<template>
  <VApp>
    <VLayout class="rounded rounded-md">
      <AppNavigationDrawer
        :rail="rail"
        :items="LIENS_MENU"
        @click="toggleRail"
      >
        <template #prepend>
          <VContainer>
            <VImg
              :src="IMAGES.logo"
              max-height="150px"
            />
            <div align="center">
              {{ rail ? '' : app.TITRE }}
            </div>
          </VContainer>
        </template>
        <template #append>
          <VDivider />
          <VBtn
            :text="rail ? '' : 'Accueil'"
            prepend-icon="mdi-home"
            :icon="rail || mobile ? 'mdi-home' : false"
            :rounded="0"
            :block="true"
            size="large"
            variant="text"
            @click.prevent.stop="handleGoAccueil"
          />
        </template>
      </AppNavigationDrawer>
      <VMain
        class="pt-6 pb-6 d-flex justify-center"
        style="min-height: 300px"
      >
        <slot />
      </VMain>
      <AppSnackbar
        :icon="icon"
        :snackbar="snackbar"
      />
    </VLayout>
  </VApp>
</template>

<style>
  html {
    overflow: auto;
  }
</style>
