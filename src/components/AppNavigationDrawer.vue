<script setup lang="ts">
  import type {LienMenuInterface} from '~/types/lienMenu'

  /**  PROPS  **/

  interface Props {
    items: LienMenuInterface[]
    rail: boolean
  }

  defineProps<Props>()

  const router = useRouter()

  function handleNavigate(route: string) {
    router.push(route)
  }
</script>
<template>
  <VNavigationDrawer
    color="primary"
    class="position-fixed bg-menu"
    :rail="rail"
    permanent
  >
    <template #prepend>
      <slot name="prepend" />
    </template>
    <VDivider />
    <VList>
      <VTooltip
        v-for="item in items"
        :key="JSON.stringify(item)"
        bottom
        :disabled="!rail"
      >
        <template v-slot:activator="{props}">
          <VListItem
            v-bind="props"
            :title="item.title"
            :prepend-icon="item.icon"
            height="50px"
            color="selected-text"
            active-class="bg-primary border-t-sm border-b-sm"
            @click.prevent.stop="handleNavigate(item.to)"
          />
        </template>
        <span>{{ item.title }}</span>
      </VTooltip>
    </VList>
    <template #append>
      <slot name="append" />
    </template>
  </VNavigationDrawer>
</template>

<style scoped></style>
