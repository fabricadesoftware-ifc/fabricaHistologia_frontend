<script setup>
import { useActionSelectorStore } from '@/stores/admin/button_action_admin'
import { ButtonDropdown } from '@/components/index'
const store = useActionSelectorStore()
</script>

<template>
  <div v-if="store.session" class="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 relative mt-12 ml-[5%]">
    <label class="text-lg text-gray-500 font-semibold">Ação:</label>

    <div class="flex items-center gap-2 relative">
      <button class="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-5 rounded-md transition" @click="store.handleAdd">
        <span class="text-xl">＋</span>
        <span class="text-xl font-normal">Adicionar {{ store.showSelect ? store.selectedOption : store.session.label }}</span>
      </button>

        <ButtonDropdown v-if="store.showSelect" :options="store.options" v-model="store.selectedOption"/>
    </div>
  </div>
</template>
