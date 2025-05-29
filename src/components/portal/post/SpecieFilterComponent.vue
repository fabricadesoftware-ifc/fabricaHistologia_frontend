<script setup>
import {onMounted, watch, ref, computed} from 'vue'
import { useSpecieStore, useAuthStore } from '@/stores'
import { useSpeciesFilter } from '@/composables/filter/species'
const speciesStore = useSpecieStore()
const authStore = useAuthStore()

onMounted(async()=> {
    if (speciesStore.speciesCount == 0) {
        await speciesStore.getSpecies() 
    }
})

const search = ref('')

const {
    selectedSpecie,
    delayActive,
    activated,
    setSelectedSpecie,
    clearFilters,
    setInitialSpecies,
    setTime,
    searchSpecies,
} = useSpeciesFilter(speciesStore.species, search.value)

const filteredSpecies = computed(() => searchSpecies(search.value))

watch(
    () => speciesStore.species, (newVal) => {
        if (newVal.length > 0) {
            setInitialSpecies(newVal)
        }
    },
    { immediate: true }
)

watch(
    () => search.value, (newVal) => {
        searchSpecies(newVal)
    }
)

</script>
<template>

        <div @click="activated ? setTime(false) : setTime(true)" :class="`flex select-none gap-2 left-40 top-24 absolute z-[999999999] cursor-pointer  ${delayActive ? 'text-[#267A7A]' : 'text-[#000]'}`"><span class="mdi mdi-filter-cog"></span><p class="font-semibold">Filtro</p></div>

    <section v-if="activated" class="w-[324px] bg-white z-[9999] select-none h-auto max-h-[464px] border-[1.8px] flex flex-col gap-2 rounded-2xl absolute border-zinc-300 sm:right-8 top-[85px] left-36" :class="delayActive ? 'open-comp' : 'close-comp'">
        <div class="w-full items-start sm:justify-center flex justify-end p-3">
            
        <p class=" font-semibold text-sm sm:mt-10 ">Filtre por Espécies</p>
        </div>

        <div class="flex justify-center items-center mt-1 h-14 w-full">
            
            <div class="w-11/12 py-2 px-3 relative rounded-full flex items-center bg-[#E9E9E9]"><span class="mdi mdi-magnify absolute right-5 text-xl"></span><input v-model="search" class="bg-transparent outline-0 w-10/12" type="text" placeholder="Procure por Espécies"></div>

        </div>
        <div v-if="selectedSpecie != null" class="w-full flex flex-col items-center gap-2">
            <div class=" w-11/12 py-3  flex items-center justify-center rounded-2xl bg-[#267A7A]">
                <p class="text-white font-semibold text-sm">{{selectedSpecie.name}}</p>
            </div>
            <span @click="clearFilters()" class="flex gap-1 w-11/12 hover:text-[#000000] duration-150 text-[#575757]"><span class="mdi mdi-close text-sm "></span><p class="text-sm ">Limpar Filtro</p></span>
        </div>
      
          <div class="w-full flex justify-center py-3 font-medium" v-if="search.length > 0 && filteredSpecies.length == 0">
            <p>Espécie Não Encontrada</p>
        </div>
        <div v-else class=" h-auto w-full flex flex-col gap-6 p-3 overflow-y-auto items-center species-nav">

            <span @click="setSelectedSpecie(specie)" class="w-11/12 flex justify-center items-center hover:bg-[#267A7A] hover:text-white duration-150 rounded-2xl py-3" v-for="specie in filteredSpecies">
                <p class=" font-semibold text-sm">{{specie.name}}</p>
            </span>
            
        </div>
      

    </section>
        <div v-if="activated" @click="setTime(false)" class="absolute w-dvw h-dvh top-0 bg-transparent z-[200]"></div>

</template>

<style scoped>
@import url('@/assets/styles/portal/specie.css');
</style>