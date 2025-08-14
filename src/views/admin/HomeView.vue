<template>
  <div ref="root" class="relative inline-block text-left">
    <!-- Botão -->
    <button
      @click.stop="toggleOpen"
      class="p-2 rounded-full border bg-white hover:bg-gray-50 shadow-sm"
      aria-haspopup="menu"
      :aria-expanded="isOpen.toString()"
      aria-label="Abrir filtros"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-show="isOpen"
      class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-4 z-50"
    >
      <TableConfig
        :initial-config="{ byId: true, alphabetical: false, perPage: 10 }"
        :additional-filters="[{ key: 'ativos', label: 'Somente ativos' }]"
        @update-config="cfg => (filters = cfg)"
      />
      <button @click="isOpen = false" class="mt-4 p-1 rounded hover:bg-gray-100 w-full">
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TableConfig from '@/components/admin/table/TableConfig.vue'

const isOpen = ref(false)
const filters = ref({})

function toggleOpen() {
  isOpen.value = !isOpen.value
}

function onDocClick(e) {
  if (isOpen.value && !e.target.closest('[ref="root"]')) {
    isOpen.value = false
  }
}
function onEsc(e) {
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onEsc)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onEsc)
})
</script>
