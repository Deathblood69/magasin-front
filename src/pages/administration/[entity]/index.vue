<script setup lang="ts">
  import {computed} from 'vue'
  import {useRoute} from 'vue-router'

  import TableauUtilisateurs from '~/domains/utilisateur/TableauUtilisateurs.vue'
  import TableauProduit from '~/domains/produit/TableauProduit.vue'
  import TableauClient from '~/domains/client/TableauClient.vue'
  import TableauTypeProduit from '~/domains/typeProduit/TableauTypeProduit.vue'
  import TableauCourse from '~/domains/course/TableauCourse.vue'

  definePageMeta({
    layout: 'admin'
  })

  type PageEntity =
    | 'clients'
    | 'produits'
    | 'type-produit'
    | 'utilisateurs'
    | 'courses'

  const route = useRoute()
  const entity = computed(() => route.params.entity as PageEntity)

  const pages: Record<PageEntity, any> = {
    clients: TableauClient,
    produits: TableauProduit,
    'type-produit': TableauTypeProduit,
    utilisateurs: TableauUtilisateurs,
    courses: TableauCourse
  }

  const currentPage = computed(() => pages[entity.value])
</script>

<template>
  <component :is="currentPage" />
</template>
