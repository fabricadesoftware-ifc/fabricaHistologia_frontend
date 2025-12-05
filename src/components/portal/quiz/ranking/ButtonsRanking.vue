<script setup>
import { ButtonFilterRanking } from '@/components/index'
import { computed, ref } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'geral' },
  modelValue: { type: String, default: 'Fácil' },
  systems: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'mode-change', 'search-select'])

const difficulties = ['Fácil', 'Médio', 'Difícil']
const modeLabel = computed(() => props.mode === 'geral' ? 'Geral' : 'Específico')

// 🔥 atualiza dificuldade
function updateDifficulty(val) {
  emit('update:modelValue', val)
}

// ---------------------------
// 🔎 Pesquisa de sistemas
// ---------------------------
const search = ref("")
const showDropdown = ref(false)

const filteredSystems = computed(() => {
  if (!search.value) return []
  const term = search.value.toLowerCase()
  return props.systems.filter(s => s.name.toLowerCase().includes(term))
})

function selectSystem(system) {
  search.value = system.name
  showDropdown.value = false
  emit('search-select', system.id)
}

function handleInput() {
  showDropdown.value = search.value.length > 0 && filteredSystems.value.length > 0
}
</script>

<template>
  <div class="flex justify-between p-2 w-full items-center gap-2 relative">

    <!-- Barra de pesquisa -->
    <div class="relative w-48">
      <input
  v-model="search"
  @input="handleInput"
  placeholder="Pesquisar sistema..."
  class="
    px-3 py-1 w-full rounded text-sm
    bg-white text-black
    border border-green-500
    placeholder-gray-400

    focus:outline-none
    focus:border-green-600
    focus:ring-2 focus:ring-green-600

    transition
  "
/>



      <!-- Dropdown -->
<!-- Dropdown -->
<div
  v-if="showDropdown"
  class="
    absolute top-full left-0 w-full
    bg-white text-black
    border border-green-500
    rounded mt-1 z-50
    max-h-40 overflow-y-auto
    shadow
  "
>
  <div
    v-for="s in filteredSystems"
    :key="s.id"
    @click="selectSystem(s)"
    class="
      px-3 py-2 text-sm cursor-pointer
      hover:bg-green-100
      transition
    "
  >
    {{ s.name }}
  </div>


        <div
          v-if="filteredSystems.length === 0"
          class="px-3 py-2 text-gray-400 text-xs"
        >
          Nenhum sistema encontrado
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div class="flex gap-2 items-center">

      <span
        class="text-white px-4 py-1 rounded-full text-sm font-semibold"
        :class="{
          'bg-blue-500': props.mode === 'geral',
          'bg-purple-600': props.mode === 'especifico',
        }"
      >
        {{ modeLabel }}
      </span>

      <ButtonFilterRanking
        v-if="props.mode === 'geral'"
        :options="difficulties"
        :modelValue="props.modelValue"
        @update:modelValue="updateDifficulty"
      />
    </div>
  </div>
</template>
