<script setup lang="ts">
  import type {ItemGroup} from '~/types/itemGroup'

  interface Props {
    items: ItemGroup[]
    defautImage: string
  }

  defineProps<Props>()

  interface Emits {
    (e: 'click', item: ItemGroup): void
  }

  const emit = defineEmits<Emits>()

  function handleClick(item: ItemGroup) {
    emit('click', item)
  }
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
            <VCard
              @click="handleClick(item)"
              width="200"
            >
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
                <div>
                  {{ item.title }}
                </div>
                <div>
                  {{ item.description }}
                </div>
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
