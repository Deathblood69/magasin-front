<script lang="ts" setup>
  import {useAuthStore} from '~/stores/auth.store'
  import type {CredentialsInterface} from '~/types/credentials'
  import FormCredentials from '~/domains/auth/FormCredentials.vue'
  import AuthLoginBtn from '~/domains/auth/AuthLoginBtn.vue'
  import {PAGES} from '~/constants/pages.const'

  /** === CONFIG === */

  const authStore = useAuthStore()

  const router = useRouter()

  /** === REFS === */

  const afterClickLoading = ref(false)

  const credentials = ref<CredentialsInterface>({
    username: '',
    password: '',
  })

  /** === METHODES === */

  async function validateConnexion() {
    await authStore.tryLogin(credentials.value)
    await router.push(PAGES.accueil.path)
  }
</script>

<template>
  <div class="d-flex flex-column w-100 h-100">
    <VImg
      src="~/assets/images/logo.svg"
      max-height="40vh"
    />
    <div class="d-flex w-100 justify-center">
      <AppFormLayout
        :closable="false"
        :loading="afterClickLoading"
        title="Magasin"
        width="33%"
        min-width="300"
        @validate="validateConnexion"
      >
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
