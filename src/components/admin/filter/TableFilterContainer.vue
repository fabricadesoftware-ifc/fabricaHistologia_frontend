<script setup>
import { computed, ref, onMounted, nextTick } from 'vue'
import { useAdmin } from '@/stores/admin/filter_admin'
import { NavigationAdminFilterButton, SearchAdminFilter } from '@/components'

const props = defineProps({
  amount: Number
})

const { generalFilterData, handleFilterAction } = useAdmin()

const margin = ref(0)
const wrapperRef = ref(null)
const listRef = ref(null)

const containerWidth = ref(0)
const listWidth = ref(0)

onMounted(async () => {
  await nextTick()
  if (wrapperRef.value) containerWidth.value = wrapperRef.value.offsetWidth
  if (listRef.value) listWidth.value = listRef.value.scrollWidth
})

// quanto ainda dá pra navegar para direita
const maxRightMargin = computed(() => Math.max(listWidth.value - containerWidth.value, 0))

const step = 200 // quanto anda por clique

const goDirection = (direction) => {
  if (direction === 'right') {
    margin.value = Math.min(margin.value + step, maxRightMargin.value)
  } else {
    margin.value = Math.max(margin.value - step, 0)
  }
}

const returnMargin = computed(() => `-${margin.value}px`)
</script>

<template>
  <div class="relative flex h-14 overflow-hidden w-full mx-auto items-center">
    <div
      ref="wrapperRef"
      class="flex items-center gap-5 relative max-w-[95%] overflow-hidden z-50 lg:hidden"
    >
      <!-- gradiente + botão esquerda -->
      <div
        v-show="margin > 0"
        class="h-full w-20 absolute left-0 top-0 bg-gradient-to-r from-white to-transparent z-40 pointer-events-none"
      />
      <NavigationAdminFilterButton
        v-show="margin > 0"
        :right="false"
        @send-action="goDirection"
      />

      <!-- lista de filtros -->
      <div
        ref="listRef"
        class="flex h-12 gap-5 duration-300 ease-in-out"
        :style="{ marginLeft: returnMargin }"
      >
        <slot />
      </div>

      <!-- gradiente + botão direita -->
      <div
        v-show="margin < maxRightMargin"
        class="h-full w-20 absolute right-0 top-0 bg-gradient-to-l from-white to-transparent z-40 pointer-events-none"
      />
      <NavigationAdminFilterButton
        v-show="margin < maxRightMargin"
        :right="true"
        @send-action="goDirection"
      />
    </div>

    <!-- select (quando tela é grande) -->
    <div class="z-50 invisible lg:visible">
      <select
        @change="handleFilterAction($event.target.value)"
        class="rounded-md bg-white border text-gray-700"
      >
        <option v-for="i in generalFilterData" :key="i.key">{{ i.nome }}</option>
      </select>
    </div>

    <SearchAdminFilter />
  </div>
</template>
