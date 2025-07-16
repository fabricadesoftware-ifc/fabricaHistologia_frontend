<script setup>
import { useAdmin } from '@/stores/admin/filter_admin';

const {activeSearch} = useAdmin()

</script>
<template>
    <div :class="`absolute h-full right-0 flex items-center rounded-full gap-10 p-3 transition-all w-full  ${activeSearch ? 'bg-[#29AC96] z-[60]' : 'z-10'}`">
    
    <input v-if="activeSearch" placeholder="Pesquise Aqui" type="text" class="w-full p-3 h-full outline-none bg-transparent text-white  rounded-full">
    

    
    <span @click="activeSearch = !activeSearch" class=" flex justify-center items-center bg-[#29AC96]/90 hover:bg-[#29AC96]/70 duration-150 cursor-pointer h-[80%] py-3 px-4 rounded-xl absolute right-2">
      <img src="@/assets/images/icons/search.svg" class="  size-7" alt="">
    </span>

    </div>

      <div @click="activeSearch = !activeSearch" v-if="activeSearch" class="w-dvw z-30 h-dvh fixed top-0 left-0"></div>
    
</template>

<style scoped>
input::placeholder {
  color: white;
}
</style>