<script setup>
import { onMounted, watch, ref, computed } from 'vue'
import { useSpecieStore, useAuthStore } from '@/stores'
import { useSpeciesFilter } from '@/composables/filter/species'
const speciesStore = useSpecieStore()
const authStore = useAuthStore()

onMounted(async () => {

    await speciesStore.getAllSpecies()
  
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
  searchSpecies
} = useSpeciesFilter(speciesStore.allSpecies)

defineExpose({ clearFilters })

const filteredSpecies = computed(() => searchSpecies(search.value))

watch(
  () => speciesStore.allSpecies,
  (newVal) => {
    if (newVal.length > 0) {
      setInitialSpecies(newVal)
    }
  },
  { immediate: true }
)

watch(
  () => search.value,
  (newVal) => {
    searchSpecies(newVal)
  }
)
</script>

<template>
  <div
    class="absolute right-44 sm:right-1/2 sm:left-1/2 sm:-translate-x-1/2 mt-[10px] sm:mt-[-50px] flex flex-col items-center z-[200]"
  >
    <!-- Header sempre visível e clicável (abre/fecha) -->
    <div
      @click="activated ? setTime(false) : setTime(true)"
      :class="[
        'flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-full transition-colors',
        delayActive ? 'text-[#267A7A]' : 'text-[#000]'
      ]"
      aria-label="Abrir filtro de espécies"
      role="button"
    >
      <span class="mdi mdi-filter-cog"></span>
      <p class="font-semibold">Filtro</p>
    </div>

    <!-- Painel do filtro (abre/fecha) -->
    <transition name="fade">
      <section
        v-if="activated"
        class="w-[324px] bg-white z-[200] select-none absolute h-auto max-h-[464px] border-[1.8px] flex flex-col gap-2 rounded-2xl border-zinc-300 mt-10"
        :class="delayActive ? 'open-comp' : 'close-comp'"
      >
        <div class="w-full items-start sm:justify-center flex justify-start px-4 pt-3">
          <p class="font-semibold text-sm">Filtre por Espécies</p>
        </div>

        <div class="flex justify-center items-center mt-1 h-14 w-full">
          <div class="w-11/12 py-2 px-3 relative rounded-full flex items-center bg-[#E9E9E9]">
            <span class="mdi mdi-magnify absolute right-5 text-xl"></span>
            <input
              v-model="search"
              class="bg-transparent outline-0 w-10/12"
              type="text"
              placeholder="Procure por Espécies"
            />
          </div>
        </div>

        <div v-if="selectedSpecie != null" class="w-full flex flex-col items-center gap-2 cursor-pointer">
          <div class="w-11/12 py-3 flex items-center justify-center rounded-2xl bg-[#267A7A]">
            <p class="text-white font-semibold text-sm">{{ selectedSpecie.name }}</p>
          </div>

          <button
            @click="clearFilters()"
            class="flex gap-1 w-11/12 hover:text-[#000000] duration-150 text-[#575757] items-center justify-center"
            type="button"
          >
            <span class="mdi mdi-close text-sm"></span>
            <p class="text-sm">Limpar Filtro</p>
          </button>
        </div>

        <div v-if="search.length > 0 && filteredSpecies.length == 0" class="w-full flex justify-center py-3 font-medium">
          <p>Espécie Não Encontrada</p>
        </div>

        <div v-else class="h-auto w-full max-h-64 min-32 overflow-y-auto flex flex-col gap-3 z-[200] p-3 items-center species-nav">
          <button
            v-for="specie in filteredSpecies"
            :key="specie.id"
            @click="setSelectedSpecie(specie)"
            class="w-11/12 flex justify-center cursor-pointer items-center hover:bg-[#267A7A] hover:text-white duration-150 rounded-2xl py-3"
            type="button"
          >
            <p class="font-semibold text-sm">{{ specie.name }}</p>
          </button>
        </div>
      </section>
    </transition>

    <!-- backdrop para fechar quando aberto -->
    
  </div>
  <div
      v-if="activated"
      @click="setTime(false)"
      class="absolute inset-0 w-dvw h-dvh top-0 left-0 bg-transparent z-[90]"
    ></div>
</template>

<style scoped>
@import url('@/assets/styles/portal/specie.css');

@keyframes bounce {
}

/* transition fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1), transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>