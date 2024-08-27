<script setup lang="ts">
  interface Props {
    items: any[]
    defautImage: string
  }

  defineProps<Props>()
</script>

<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.title"
        >
          <VItem>
            <VCard width="200">
              <VCardText class="d-flex justify-center align-center">
                <VImg
                  :src="item.image ?? defautImage"
                  width="100"
                  alt="Image"
                />
              </VCardText>
              <VCardTitle
                class="d-flex flex-column justify-center align-center"
              >
                <slot
                  name="item"
                  :item="item"
                >
                  {{ item }}
                </slot>
              </VCardTitle>
              <VCardActions class="d-flex justify-center align-center">
                <slot
                  :item="item"
                  name="actions"
                />
              </VCardActions>
            </VCard>
          </VItem>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<style scoped></style>
