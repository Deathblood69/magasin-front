<script lang="ts" setup>
  import {useAuthStore} from '~/stores/auth.store'
  import type {CredentialsInterface} from '~/types/credentials'
  import FormCredentials from '~/domains/auth/FormCredentials.vue'
  import AuthLoginBtn from '~/domains/auth/AuthLoginBtn.vue'
  import {IMAGES} from 'assets/images/images'
  import {PAGES} from '~/constants/pages.const'

  /** === CONFIG === */

  const {app} = useRuntimeConfig()

  const authStore = useAuthStore()

  const router = useRouter()

  /** === REFS === */

  const afterClickLoading = ref(false)

  const credentials = ref<CredentialsInterface>({
    username: '',
    password: ''
  })

  /** === METHODES === */

  async function validateConnexion() {
    await authStore.tryLogin(credentials.value)
    await router.push(PAGES.accueil)
  }
</script>

<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="d-flex w-100 justify-center">
      <AppFormLayout
        :closable="false"
        :loading="afterClickLoading"
        width="33%"
        min-width="300"
        @validate="validateConnexion"
      >
        <VImg
          :src="IMAGES.logo"
          max-height="40vh"
        />
        <VCardTitle class="d-flex w-100 justify-center">
          {{ app.TITRE }}
        </VCardTitle>
        <FormCredentials v-model="credentials" />
        <template #actions="{validate, loading}">
          <AuthLoginBtn
            :loading="loading"
            @click="validate"
          />
        </template>
      </AppFormLayout>
    </div>
  </div>
</template>
