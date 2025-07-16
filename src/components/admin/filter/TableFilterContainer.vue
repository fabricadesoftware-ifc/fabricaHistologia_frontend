<script setup>
import { computed, ref } from 'vue';

import { useAdmin } from '@/stores/admin/filter_admin';


const props = defineProps({
  amount: {
    type: Number
  }
})

const {
    generalFilterData, 
    handleFilterAction,
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

const activeSearch = ref(false)

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
    <span v-show="margin >= 200"
      @click="goDirection('left')"
      class="w-[30px] h-[30px] bg-green-50 active:scale-110 absolute left-5 rotate-180 z-50 hover:scale-105 duration-150 cursor-pointer flex items-center justify-center"
    >
      <img class="w-full h-full" src="@/assets/images/icons/admin/Group 21.png" />
    </span>

    <div
      class="flex h-12 gap-5 duration-200 ease-in-out"
      :style="{ marginLeft: returnMargin }"
    >
      <slot />
    </div>

    <!-- Gradiente (efeito visual) -->
    <div v-show="maxRightMargin >= margin" class="h-full md:bg-white md:opacity-60 md:w-20 w-60 absolute right-0 top-0 bg-gradient-to-l duration-150 from-white to-transparent z-40"></div>

    <!-- Botão de navegação -->
    <span v-show="maxRightMargin >= margin"
      @click="goDirection('right')"
      class="w-[30px] h-[30px] bg-green-50 active:scale-110 absolute right-5 z-50 hover:scale-105 duration-150 cursor-pointer flex items-center justify-center"
    >
      <img class="w-full h-full" src="@/assets/images/icons/admin/Group 21.png" />
    </span>

  </div>

  <div class="z-50 invisible lg:visible">
    <select @change="handleFilterAction($event.target.value)" class="rounded-md bg-white border text-gray-700" >  
      <option v-for="i in generalFilterData"  >{{ i.nome }}</option>
    </select>
  </div>

  <div :class="`absolute h-full right-0 flex items-center rounded-full gap-10 p-3 transition-all w-full  ${activeSearch ? 'bg-[#29AC96] z-[60]' : 'z-10'}`">
    
    <input v-if="activeSearch" placeholder="Pesquise Aqui" type="text" class="w-full p-3 h-full outline-none bg-transparent text-white  rounded-full">
    

    
    <span @click="activeSearch = !activeSearch" class=" flex justify-center items-center bg-[#29AC96]/90 hover:bg-[#29AC96]/70 duration-150 cursor-pointer h-[80%] py-3 px-4 rounded-xl absolute right-2">
      <img src="@/assets/images/icons/search.svg" class="  size-7" alt="">
    </span>

    </div>
    

  </div>

  <div @click="activeSearch = !activeSearch" v-if="activeSearch" class="w-dvw inset-0 z-30 h-dvh absolute top-0 left-0"></div>
    
</template>

<style scoped>
input::placeholder {
  color: white;
}
</style>
