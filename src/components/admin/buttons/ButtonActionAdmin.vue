<script setup>
import { useActionSelectorStore } from '@/stores/admin/button_action_admin'
import { ButtonDropdown } from '@/components/index'
const store = useActionSelectorStore()
</script>

<template>
  <div v-if="store.session" class="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 relative">
    <label class="text-sm text-gray-500 font-semibold">Ação:</label>

    <div class="flex items-center gap-2 relative">
      <button class="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition" @click="store.handleAdd">
        <span class="text-xl">＋</span>
        <span>Adicionar {{ store.showSelect ? store.selectedOption : store.session.label }}</span>
      </button>

        <ButtonDropdown v-if="store.showSelect" :options="store.options" v-model="store.selectedOption"/>
    </div>
  </div>
</template>
