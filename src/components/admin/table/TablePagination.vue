<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(["page-change"]);

function changePage(page) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("page-change", page);
  }
}

const pages = computed(() => {
  const pagesArray = [];
  const { currentPage, totalPages } = props;

  // Páginas do meio (anterior, atual, próxima)
  let start = currentPage - 1;
  let end = currentPage + 1;

  // Ajusta os limites para não passar de 1 e totalPages
  if (start < 1) start = 1;
  if (end > totalPages) end = totalPages;

  // Adiciona páginas do meio
  for (let i = start; i <= end; i++) {
    pagesArray.push(i);
  }

  // Adiciona "..." se houver intervalo entre meio e última página
  if (end < totalPages - 1) {
    pagesArray.push("...");
  }

  // Adiciona última página se não estiver incluída
  if (end < totalPages) {
    pagesArray.push(totalPages);
  }

  return pagesArray;
});
</script>

<template>
  <div class="pagination">
    <!-- Botão anterior -->
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1">
      &lt;
    </button>

    <!-- Páginas -->
    <button
      v-for="(page, index) in pages"
      :key="index"
      @click="typeof page === 'number' && changePage(page)"
      :class="[{ active: page === currentPage, dots: page === '...' }] "
      :disabled="page === '...'">
      {{ page }}
    </button>

    <!-- Botão próximo -->
    <button 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages">
      &gt;
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #21b19b;
  font-weight: 500;
}

button.active {
  background: #21b19b;
  color: white;
  border-radius: 8px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.dots {
  cursor: default;
}
</style>
