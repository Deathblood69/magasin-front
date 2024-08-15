<script setup lang="ts">
  import Panier from '~/domains/panier/Panier.vue'
  import {PAGES} from '~/constants/pages.const'
  import {ROLES} from '~/constants/roles.const'
  import {IMAGES} from 'assets/images/images'

  /** ==== CONFIG ===  **/

  const {app} = useRuntimeConfig()

  const router = useRouter()

  const {snackbar, icon} = storeToRefs(useSnackbarStore())

  const {user, logOut} = useAuthStore()

  function handleGoSetting() {
    router.push(PAGES.administration)
  }

  function handleLogOut() {
    logOut()
    router.push(PAGES.connexion)
  }
</script>

<template>
  <VLayout class="rounded rounded-md">
    <AppBar
      :titre="app.TITRE"
      :logo="IMAGES.logo"
    >
      <template #actions>
        <Panier />
        <VBtn
          v-if="user?.roles?.includes(ROLES.ADMINISTRATEUR.value)"
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
    </AppBar>
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
