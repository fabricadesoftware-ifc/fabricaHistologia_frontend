<script setup>
import { ref } from 'vue'


const items = ref([
  { id: 28, name: 'Sistema Respiratório', system: 'Sistema' },
  { id: 16, name: 'Coração', system: 'Órgão' },
  { id: 56, name: 'Tecido Epitelial', system: 'Lâmina' },
  { id: 98, name: 'Aula #1: Genes Homólogos', system: 'Materiais de Apoio' },
  { id: 134, name: 'Qual é o nome do sistema que cuida da p...', system: 'Quiz' },
  { id: 204, name: 'Sistema Renal', system: 'Respostas' }
])

function editItem(item) {
  alert(`Editar: ${item.name}`)
}

function deleteItem(id) {
  items.value = items.value.filter((i) => i.id !== id)
}

function openPage(item) {
  alert(`Abrir página para: ${item.name}`)
}
</script>

<template>
  <div class="overflow-x">
    <table class="w-full table-fixed border-collapse rounded-lg overflow-hidden text-[#7F7E7E]">
      <thead>
        <tr class="border-b border-gray-200 text-sm">
          <th class="w-[80px] px-2 py-2 border-r border-gray-200 text-left font-semibold">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined">numbers</span>
              ID
            </div>
          </th>
          <th class="px-4 py-2 border-r border-gray-200 text-left font-semibold">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined">shoppingmode</span>
              Nome
            </div>
          </th>
          <th class="w-[200px] px-4 py-2 border-r border-gray-200 text-left font-semibold">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined">grid_on</span>
              Sistema
            </div>
          </th>
          <th class="w-[180px] px-4 py-2 border-r border-gray-200 text-left font-semibold">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined">settings</span>
              Administração
            </div>
          </th>
        </tr>
      </thead>

      <tbody class="min-h-[300px]">
        <!-- linhas com dados -->
        <tr v-for="item in items" :key="item.id" 
            class="border-b border-gray-200 hover:bg-gray-50">
          <td class="w-[80px] text-center px-2 py-2 border-r">{{ item.id }}</td>
          <td class="px-4 py-2 border-r">{{ item.name }}</td>
          <td class="px-4 py-2 border-r">{{ item.system }}</td>

          <td class="px-4 py-2 flex gap-2 border-r">
            <button @click="editItem(item)" class="w-[35px] h-[35px] bg-[#FFE12EB2] hover:bg-yellow-200 text-white p-1 rounded"> 
              <span class="material-symbols-outlined">edit</span>
            </button>

            <button @click="deleteItem(item.id)" class="bg-[#E40000B2] w-[35px] h-[35px] hover:bg-red-600 text-white p-1 rounded"> 
              <span class="material-symbols-outlined">delete</span>
            </button>

            <button @click="openPage(item)" class="bg-[#29AC96B2] w-[35px] h-[35px] hover:bg-teal-600 text-white p-1 rounded"> 
              <span class="material-symbols-outlined">open_in_new</span>
            </button>
          </td>
        </tr>

        <!-- linhas vazias para manter altura -->
        <tr v-for="n in items.length" :key="n" 
            class="border-b border-gray-200">
        </tr>
      </tbody>
    </table>
  </div>
</template>
