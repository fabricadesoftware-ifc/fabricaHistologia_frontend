<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"

// Props
const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
    /*
      Exemplo de columns:
      [
        { key: "id", label: "ID" },
        { key: "name", label: "Nome", editable: true },
        { key: "species.name", label: "Espécie" },
        { key: "image.url", label: "Imagem", type: "image" },
      ]
    */
  }
})

const emit = defineEmits(["update:cell", "edit", "delete"])
const editingCell = ref(null)

const startEdit = (rowId, key) => {
  editingCell.value = { rowId, key }
}

const finishEdit = (row, key, event) => {
  emit("update:cell", { row, key, value: event.target.value })
  editingCell.value = null
}

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((o, k) => (o ? o[k] : null), obj)
}
</script>

<template>
  <div class="overflow-x-auto w-[95%] mx-auto mt-8 mb-10 rounded-xl shadow">
    <table class="min-w-full bg-white rounded-xl">
      <thead>
        <tr class="bg-[#F5F5F5] text-[#267A7A] text-left">
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-3 font-semibold text-sm first:rounded-tl-xl last:rounded-tr-xl"
          >
            {{ col.label }}
          </th>
          <th class="px-4 py-3 font-semibold text-sm">Administração</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
          class="border-b last:border-b-0 hover:bg-[#29AC96]/10 transition-colors group"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-2 text-sm text-zinc-700 max-w-[220px] truncate"
          >
            <!-- Imagem -->
            <template v-if="col.type === 'image'">
              <img
                v-if="getNestedValue(row, col.key)"
                :src="getNestedValue(row, col.key)"
                :alt="row.name"
                class="w-10 h-10 object-cover rounded border border-zinc-100"
              />
            </template>

            <!-- Editável -->
            <template v-else-if="col.editable">
              <input
                v-if="editingCell?.rowId === row.id && editingCell?.key === col.key"
                type="text"
                class="border p-1 rounded w-full text-sm"
                :value="getNestedValue(row, col.key)"
                @blur="finishEdit(row, col.key, $event)"
                @keyup.enter="finishEdit(row, col.key, $event)"
              />
              <span
                v-else
                class="cursor-pointer"
                @click="startEdit(row.id, col.key)"
              >
                {{ getNestedValue(row, col.key) }}
              </span>
            </template>

            <!-- Normal -->
            <template v-else>
              {{ getNestedValue(row, col.key) }}
            </template>
          </td>

          <td class="px-5 py-2 flex justify-start gap-2">
            <RouterLink
              :to="`/admin/posts/${row.id}`"
              class="bg-[#29AC96] hover:bg-[#267A7A] text-white p-2 rounded-lg transition-colors"
              title="Editar"
            >
              <span class="mdi mdi-pencil"></span>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
