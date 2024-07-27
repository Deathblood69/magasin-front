<script lang="ts" setup>
  /** === PROPS === */

  interface Props {
    titleButton?: string
    icon: string
  }

  defineProps<Props>()

  /** === PROPS === */

  const menu = ref(false)
</script>

<template>
  <div>
    <vMenu
      v-model="menu"
      :close-on-content-click="false"
      location="bottom center"
    >
      <template v-slot:activator="{props}">
        <slot
          :props="props"
          name="activator"
        >
          <vBtn
            color="primary"
            v-bind="props"
          >
            <slot name="title">
              {{ titleButton }}
            </slot>
          </vBtn>
        </slot>
      </template>

      <vCard class="cardAction">
        <vCardItem>
          <slot />
        </vCardItem>
        <vCardActions class="Actions">
          <slot name="actions" />
        </vCardActions>
      </vCard>
    </vMenu>
  </div>
</template>

<style scoped>
  .cardAction {
    min-width: 300px;
  }

  .Actions {
    display: flex;
    justify-content: center;
  }
</style>
