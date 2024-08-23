<script setup lang="ts">
  import TableauUtilisateurs from '~/domains/utilisateur/TableauUtilisateurs.vue'
  import TableauProduit from '~/domains/produit/TableauProduit.vue'
  import TableauClient from '~/domains/client/TableauClient.vue'
  import TableauTypeProduit from '~/domains/typeProduit/TableauTypeProduit.vue'
  import TableauCourse from '~/domains/course/TableauCourse.vue'

  definePageMeta({
    layout: 'admin'
  })

  const {params} = useRoute()
  const {entity} = params

  const pages = {
    clients: TableauClient,
    produits: TableauProduit,
    'type-produit': TableauTypeProduit,
    utilisateurs: TableauUtilisateurs,
    courses: TableauCourse
  }
</script>

<template>
  <component :is="pages[entity]" />
</template>

<style scoped></style>
