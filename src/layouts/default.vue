<script setup lang="ts">
  import {PAGES} from '~/constants/pages.const'
  import Panier from '~/domains/panier/Panier.vue'

  /** ==== CONFIG ===  **/
  const router = useRouter()

  const {snackbar, icon} = storeToRefs(useSnackbarStore())

  const {logOut} = useAuthStore()

  function handleGoSetting() {
    router.push(PAGES.administration.path)
  }

  function handleLogOut() {
    logOut()
    router.push(PAGES.connexion.path)
  }
</script>

<template>
  <VLayout class="rounded rounded-md">
    <AppAppBar>
      <template #actions>
        <Panier />
        <VBtn
          :disabled="false"
          @click="handleGoSetting"
        >
          <VIcon
            icon="mdi-cog"
            size="x-large"
          />
        </VBtn>
        <VBtn
          :disabled="false"
          @click="handleLogOut"
        >
          <VIcon
            icon="mdi-logout"
            size="x-large"
          />
        </VBtn>
      </template>
    </AppAppBar>
    <VMain class="d-flex justify-center align-center">
      <slot />
    </VMain>
    <AppSnackbar
      :icon="icon"
      :snackbar="snackbar"
    />
  </VLayout>
</template>

<style scoped></style>
