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
  const drawer = ref(!mobile.value)
  const expandBtnValue = ref(false)

  /**  COMPUTED  **/

  const rail = computed(() => {
    if (!mobile.value) {
      return expandBtnValue.value
    } else {
      return true
    }
  })

  async function handleGoAccueil() {
    await router.push(PAGES.accueil)
  }
</script>

<template>
  <VApp>
    <VLayout class="rounded rounded-md">
      <AppNavigationDrawer
        v-model="drawer"
        :rail="rail"
        :items="LIENS_MENU"
      >
        <template #prepend>
          <VContainer @click="expandBtnValue = !expandBtnValue">
            <VImg
              :src="IMAGES.logo"
              max-height="150px"
            />
            <div
              v-if="!expandBtnValue"
              align="center"
            >
              {{ app.TITRE }}
            </div>
          </VContainer>
        </template>
        <template #append>
          <VDivider />
          <VBtn
            :text="expandBtnValue ? '' : 'Accueil'"
            prepend-icon="mdi-home"
            :icon="expandBtnValue || mobile ? 'mdi-home' : false"
            :rounded="0"
            :block="true"
            size="large"
            variant="text"
            @click="handleGoAccueil"
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
