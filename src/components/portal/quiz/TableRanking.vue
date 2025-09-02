<script setup>
import medalGold from "@/assets/images/icons/medal-badge-achievement-svgrepo-com.svg"
import medalSilver from "@/assets/images/icons/medal-badge-achievement-svgrepo-com (1).svg"
import medalBronze from "@/assets/images/icons/medal-badge-achievement-svgrepo-com (3).svg"
import { ref } from "vue"


const rankingData = ref([
  { pos: 1, name: "Henrique Chepli", time: "1h40m30s", correct: "29/30", medal: medalGold, color: "text-green-600" },
  { pos: 2, name: "Henrique Chepli", time: "1h40m30s", correct: "29/30", medal: medalSilver, color: "text-green-600" },
  { pos: 3, name: "Henrique Chepli", time: "1h40m30s", correct: "29/30", medal: medalBronze, color: "text-green-600" },
  { pos: 4, name: "Henrique Chepli", time: "1h40m30s", correct: "29/30", medal: null, color: "text-orange-500" },
  { pos: 5, name: "Henrique Chepli", time: "1h40m30s", correct: "29/30", medal: null, color: "text-orange-500" },
  { pos: 6, name: "Henrique Chepli", time: "1h40m30s", correct: "29/30", medal: null, color: "text-red-600" },
])

</script>

<template>
    <div class="overflow-x-auto w-[55%] rounded-2xl border border-gray-200 shadow-sm">
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
            v-for="player in rankingData" 
            :key="player.pos" 
            class="border-t text-gray-700 text-sm"
          >
            <td class="p-4 font-bold">
              <template v-if="player.medal">
                <img :src="player.medal" alt="Medalha" class="w-8 h-8 inline-block mr-2" />
              </template>
              <span v-else>#{{ player.pos }}</span>
            </td>
            <td class="p-4 font-medium">{{ player.name }}</td>
            <td class="p-4 font-semibold" :class="player.color">{{ player.time }}</td>
            <td class="p-4 font-semibold" :class="player.color">{{ player.correct }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
