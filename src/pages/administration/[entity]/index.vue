<script setup lang="ts">
  import TableauUtilisateurs from '~/domains/user/TableauUtilisateurs.vue'
  import TableauProduit from '~/domains/produit/TableauProduit.vue'
  import TableauClient from '~/domains/client/TableauClient.vue'

  definePageMeta({
    layout: 'admin'
  })

  const {params} = useRoute()
  const {entity} = params

  const pages = {
    utilisateurs: TableauUtilisateurs,
    produits: TableauProduit,
    clients: TableauClient
  }

  onMounted(() => {
    console.log(entity)
  })
</script>

<template>
  <component :is="pages[entity]" />
</template>

<style scoped></style>
