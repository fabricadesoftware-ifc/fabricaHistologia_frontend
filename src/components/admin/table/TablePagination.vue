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

  let start = currentPage - 1;
  let end = currentPage + 1;

  if (start < 1) {
    start = 1;
    end = Math.min(3, totalPages);
  }
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(totalPages - 2, 1);
  }

  for (let i = start; i <= end; i++) {
    pagesArray.push(i);
  }

  if (end < totalPages) {
    pagesArray.push("...");
    pagesArray.push(totalPages);
  }

  return pagesArray;
});
</script>

<template>
  <div class="flex items-center gap-2 text-lg">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded-md text-teal-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-100">
      &lt;
    </button>

    <button
      v-for="(page, index) in pages"
      :key="index"
      @click="typeof page === 'number' && changePage(page)"
      :class="[
        'px-3 py-1 rounded-md font-medium',
        page === currentPage ? 'bg-teal-500 text-white' : 'text-teal-500 hover:bg-teal-100',
        page === '...' ? 'cursor-default text-gray-400 hover:bg-transparent' : ''
      ]"
      :disabled="page === '...'">
      {{ page }}
    </button>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded-md text-teal-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-100">
      &gt;
    </button>
  </div>
</template>
