<script lang="ts" setup>
  import {useDisplay} from 'vuetify'
  import {LIENS_MENU} from '~/constants/liensMenu.const'
  import {PAGES} from '~/constants/pages.const'

  /**  CONFIG  **/

  const {snackbar, icon} = storeToRefs(useSnackbarStore())

  /**  REFS  **/
  const {mobile} = useDisplay()
  const drawerActivated = ref(!mobile.value)

  /**  COMPUTED  **/

  const drawerActivatedCustom = computed(() => mobile.value)

  async function handleGoAccueil() {
    await useRouter().push(PAGES.accueil)
  }
</script>

<template>
  <VApp>
    <VLayout class="rounded rounded-md">
      <AppNavigationDrawer
        v-model="drawerActivated"
        :temporary="drawerActivatedCustom"
        :liens="LIENS_MENU"
      >
        <template #append>
          <VBtn
            :block="true"
            class="mb-3"
            prepend-icon="mdi-home"
            text="Accueil"
            variant="text"
            @click="handleGoAccueil"
          />
        </template>
      </AppNavigationDrawer>

      <VAppBarNavIcon
        v-if="drawerActivatedCustom"
        @click="drawerActivated = !drawerActivated"
      />

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
