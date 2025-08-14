<template>
  <div class="bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-4 w-full max-w-xs">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-semibold">Configuração da Tabela</h3>
    </div>
    <div class="space-y-3">
      <!-- Filtros obrigatórios -->
      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="state.byId" @change="emitAll" />
        <span>Mostrar por ID</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="state.alphabetical" @change="emitAll" />
        <span>Mostrar por ordem alfabética</span>
      </label>
      <div>
        <label class="block text-sm mb-1">Quantidade de itens por página</label>
        <input
          type="number"
          min="1"
          max="20"
          :value="state.perPage"
          @input="onPerPageInput"
          class="w-24 border rounded-lg p-2"
        />
        <p class="text-xs text-gray-500 mt-1">1–20</p>
      </div>
      <!-- Filtros adicionais -->
      <div v-if="additionalFilters.length" class="pt-2 border-t">
        <p class="text-xs font-medium text-gray-500 mb-1">Filtros adicionais</p>
        <label
          v-for="f in additionalFilters"
          :key="f.key"
          class="flex items-center gap-2 py-1"
        >
          <input type="checkbox" v-model="state.additional[f.key]" @change="emitAll" />
          <span>{{ f.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  initialConfig: {
    type: Object,
    default: () => ({})
  },
  additionalFilters: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update-config'])

function clamp(n) {
  n = Number(n) || 1
  return Math.max(1, Math.min(20, n))
}

const state = reactive({
  byId: props.initialConfig.byId ?? false,
  alphabetical: props.initialConfig.alphabetical ?? false,
  perPage: clamp(props.initialConfig.perPage ?? 10),
  additional: {}
})

// Inicializa filtros adicionais
props.additionalFilters.forEach(f => {
  state.additional[f.key] = props.initialConfig.additional?.[f.key] ?? false
})

function onPerPageInput(e) {
  state.perPage = clamp(e.target.value)
  emitAll()
}

function emitAll() {
  emit('update-config', {
    byId: state.byId,
    alphabetical: state.alphabetical,
    perPage: state.perPage,
    additional: { ...state.additional }
  })
}

// Emite evento sempre que qualquer configuração muda
watch(
  () => [state.byId, state.alphabetical, state.perPage, state.additional],
  emitAll,
  { deep: true }
)
</script>

<style scoped>
input[type="checkbox"] {
  accent-color: #29AC96;
}
</style>