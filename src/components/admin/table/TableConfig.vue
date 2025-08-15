<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update-config']);

const isOpen = ref(false);
const showAlphabetically = ref(true);
const showByTable = ref(true);
const showById = ref(true);
const itemsPerPage = ref(2);

const openPopup = () => (isOpen.value = true);
const closePopup = () => (isOpen.value = false);

const emitConfigUpdate = () => {
  emit('update-config', {
    showAlphabetically: showAlphabetically.value,
    showByTable: showByTable.value,
    showById: showById.value,
    itemsPerPage: itemsPerPage.value,
  });
};

const fields = [
  {
    id: 'showAlphabetically',
    label: 'Ordem Alfabética',
    type: 'checkbox',
    model: showAlphabetically,
  },
  {
    id: 'showByTable',
    label: 'Por Tabela',
    type: 'checkbox',
    model: showByTable,
  },
  {
    id: 'showById',
    label: 'Por ID',
    type: 'checkbox',
    model: showById,
  },
  {
    id: 'items-per-page',
    label: 'Quantidade por página',
    type: 'number',
    model: itemsPerPage,
    min: 1,
    max: 20,
  },
];

watch([showAlphabetically, showByTable, showById, itemsPerPage], emitConfigUpdate);
</script>

<template>
  <div class="inline-block">
    <button
      @click="openPopup"
      v-if="!isOpen"
      class="px-4 py-2 text-[#29AC96] rounded border border-transparent hover:bg-gray-100 transition flex items-center justify-center"
    >
      <span class="material-symbols-outlined text-[24px] text-[#9C9C9C]" style="font-variation-settings: 'FILL' 1, 'wght' 400">
        tune
      </span>
    </button>

    <div
      v-if="isOpen"
      class="flex items-center justify-center z-50"
      @click.self="closePopup"
    >
      <div class="bg-white p-5 rounded-lg w-80 shadow-md transform scale-95 transition">
        <div class="flex justify-between items-center mb-4 text-[#9C9C9C]">
          <h2 class="text-lg font-semibold">Filtros</h2>
          <button @click="closePopup">
            <span class="material-symbols-outlined text-[24px] text-[#29AC96]" style="font-variation-settings: 'FILL' 1, 'wght' 400">
              tune
            </span>
          </button>
        </div>

        <div class="space-y-4 text-[#555]">
          <div v-for="field in fields" :key="field.id" class="flex flex-col">
            <label class="flex items-center space-x-2">
              <input
                :type="field.type"
                v-model="field.model"
                :min="field.min"
                :max="field.max"
                class="accent-[#29AC96] border border-gray-300 rounded px-2 py-1"
                :class="{ 'w-20 text-center text-black': field.type === 'number' }"
              />
              <span>{{ field.label }}</span>
              <span v-if="field.type === 'number' && field.max" class="text-xs text-gray-500 ml-1">
                *Máx: {{ field.max }}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>