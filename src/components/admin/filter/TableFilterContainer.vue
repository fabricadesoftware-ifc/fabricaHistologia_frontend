<script setup>
import { computed, ref } from 'vue';

import { useAdmin } from '@/stores/admin/filter_admin';

import { NavigationAdminFilterButton, SearchAdminFilter } from '@/components';

const props = defineProps({
  amount: {
    type: Number
  }
})

const {
    generalFilterData, 
    handleFilterAction,
    activeSearch,
} = useAdmin()

const margin = ref(0)
const step = 85
const width = window.innerWidth
const maxRightMargin = computed(() => {
  if (width > 1630) {
   return ((props.amount)  * step) - 400
  } else {
    console.log(margin.value, (props.amount)  * 120)
   return ((props.amount)  * 120)
  }
  })

const goDirection = (direction) => {
  if (direction === 'right') {
    if (margin.value < maxRightMargin.value) {
      margin.value += 300
    }
  } else {
    if (margin.value > 0) {
      margin.value -= 300
    }
  }
}

const returnMargin = computed(() => `-${margin.value}px`)
</script>

<template>
  <div class="relative flex h-14 overflow-hidden w-[80%] mx-auto items-center">
  <div class="flex items-center gap-5 relative max-w-[95%] overflow-hidden z-50 lg:hidden">
     <div v-show="margin >= 200" class="h-full w-60 absolute left-0 top-0 md:bg-white md:opacity-60 md:w-20 bg-gradient-to-r duration-150 from-white to-transparent z-40"></div>

    <!-- Botão de navegação -->
  
    <navigation-admin-filter-button v-show="margin >= 200" :right="false" @send-action="goDirection" />

    <div
      class="flex h-12 gap-5 duration-200 ease-in-out"
      :style="{ marginLeft: returnMargin }"
    >
      <slot />
    </div>

    <!-- Gradiente (efeito visual) -->
    <div v-show="maxRightMargin >= margin" class="h-full md:bg-white md:opacity-60 md:w-20 w-60 absolute right-0 top-0 bg-gradient-to-l duration-150 from-white to-transparent z-40"></div>

    <!-- Botão de navegação -->
 
     <navigation-admin-filter-button v-show="maxRightMargin >= margin" :right="true"  @send-action="goDirection" />

  </div>

  <div class="z-50 invisible lg:visible">
    <select @change="handleFilterAction($event.target.value)" class="rounded-md bg-white border text-gray-700" >  
      <option v-for="i in generalFilterData"  >{{ i.nome }}</option>
    </select>
  </div>

  <SearchAdminFilter />
    

  </div>


</template>
