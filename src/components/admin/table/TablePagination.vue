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

  if (props.currentPage > 1) {
    pagesArray.push(props.currentPage - 1); 
  }

  pagesArray.push(props.currentPage); 

  if (props.currentPage < props.totalPages) {
    pagesArray.push(props.currentPage + 1); 
  }

  return pagesArray;
});
</script>

<template>
  <div class="pagination">
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1">
      &lt;
    </button>

    <button
      v-for="(page, index) in pages"
      :key="index"
      @click="typeof page === 'number' && changePage(page)"
      :class="[{ active: page === currentPage }]"
    >
      {{ page }}
    </button>

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
  gap: 8px;
  font-size: 16px;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 6px 10px;
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
