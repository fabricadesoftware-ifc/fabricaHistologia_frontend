<script setup>
import medalGold from "@/assets/images/icons/medal-badge-achievement-svgrepo-com.svg"
import medalSilver from "@/assets/images/icons/medal-badge-achievement-svgrepo-com (1).svg"
import medalBronze from "@/assets/images/icons/medal-badge-achievement-svgrepo-com (3).svg"

// recebe dados como prop
defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

// função para decidir medalha
const getMedal = (pos) => {
  if (pos === 1) return medalGold
  if (pos === 2) return medalSilver
  if (pos === 3) return medalBronze
  return null
}

// função para definir cor do tempo/acertos
const getColor = (pos) => {
  if (pos <= 2) return "text-green-600"
  if (pos <= 5) return "text-orange-500"
  return "text-red-600"
}
</script>


<template>
    <div class="overflow-x-auto w-[100%] rounded-2xl border border-gray-200 shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50">
          <tr class="text-gray-500">
            <th class="p-4">#</th>
            <th class="p-4">Jogador</th>
            <th class="p-4">Tempo(s)</th>
            <th class="p-4">Acertos</th>
          </tr>
        </thead>
<tbody>
  <tr 
    v-for="(player, index) in data" 
    :key="index" 
    class="border-t text-gray-700 text-sm"
  >
    <td class="p-4 font-bold">
      <template v-if="getMedal(player.pos)">
        <img :src="getMedal(player.pos)" alt="Medalha" class="w-8 h-8 inline-block mr-2" />
      </template>
      <span v-else>#{{ player.pos }}</span>
    </td>
    <td class="p-4 font-medium">{{ player.name }}</td>
    <td class="p-4 font-semibold" :class="getColor(player.pos)">{{ player.time }}</td>
    <td class="p-4 font-semibold" :class="getColor(player.pos)">{{ player.correct }}</td>
  </tr>
</tbody>

      </table>
    </div>
</template>
