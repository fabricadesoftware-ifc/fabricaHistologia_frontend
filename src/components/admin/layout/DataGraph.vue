<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  total: Number,
  seeMoreUrl: String,

  // 🔹 Lista de itens crus (ex: organStore.organs)
  items: {
    type: Array,
    default: () => []
  },

  // 🔹 Campo pelo qual vamos agrupar (ex: "system", "species.name")
  groupBy: {
    type: String,
    default: ''
  },

  // 🔹 Cores opcionais (se não passar, gera automático)
  colors: {
    type: Array,
    default: () => ['#29AC96', '#A259D9', '#444', '#FF8C00', '#2D9CDB']
  }
})

// 🔹 Função auxiliar para acessar campos aninhados (ex: "species.name")
const getValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj) || 'Não definido'
}

// 🔹 Computed que calcula os percentuais dinamicamente
const processedData = computed(() => {
  if (!props.items.length || !props.groupBy) return []

  const total = props.items.length
  const grouped = {}

  props.items.forEach((item) => {
    const key = getValue(item, props.groupBy)
    if (!grouped[key]) grouped[key] = 0
    grouped[key]++
  })

  return Object.entries(grouped).map(([label, count], index) => ({
    label,
    percent: Math.round((count / total) * 100),
    color: props.colors[index % props.colors.length]
  }))
})
</script>

<template>
  <div class="bg-white rounded-xl border border-zinc-200 p-5 w- min-w-[350px] max-w-md">
    <div class="flex items-center justify-between mb-3">
      <span class="text-2xl font-semibold">{{ total }} {{ title }}</span>
      <RouterLink :to="seeMoreUrl" class="text-[#29AC96] font-medium text-sm flex items-center gap-1 hover:underline">
        Veja Mais <span class="mdi mdi-chevron-right text-base"></span>
      </RouterLink>
    </div>

    <!-- Barras do gráfico -->
    <div class="flex items-center gap-2 mb-4">
      <div class="flex-1 flex gap-2">
        <div
          v-for="item in processedData"
          :key="item.label"
          class="rounded-full h-3"
          :style="{ background: item.color, width: item.percent + '%' }"
        ></div>
      </div>
    </div>

    <!-- Legenda -->
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      <div v-for="item in processedData" :key="item.label" class="flex items-center gap-2 text-zinc-600 text-sm">
        <span class="w-3 h-3 rounded-full" :style="{ background: item.color }"></span>
        <span>{{ item.label }} ({{ item.percent }}%)</span>
      </div>
    </div>
  </div>
</template>
