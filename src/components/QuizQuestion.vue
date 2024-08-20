<script setup>
import ContainerDefault from '@/components/ContainerDefault.vue'
import { ref } from 'vue'

const answerNumber = ref(0)

function selectAnswer(value) {
  console.log('Selected value:', value)
  if (value === 2) {
    answerNumber.value = 2
  } else if (value === 1) {
    answerNumber.value = 1
  } else if (value === 3) {
    answerNumber.value = 3
  }
}
</script>

<template>
  <ContainerDefault>
    <div class="flex flex-col gap-5 border border-gray-100 p-6 rounded-lg">
      <div>
        <h4 class="text-base font-medium">1. Pergunta:</h4>
        <ol class="list-inside mt-2 mb-2">
          <li>
            <p class="mx-5 mt-1 text-base font-medium font-poppins">(I) Teste</p>
          </li>
          <li>
            <p class="mx-5 mt-1 text-base font-medium font-poppins">(II) Teste</p>
          </li>
          <li>
            <p class="mx-5 mt-1 text-base font-medium font-poppins">(III) Teste</p>
          </li>
        </ol>
        <h4 class="mx-5 text-base font-medium">Bla bla bla, nos homens:</h4>
      </div>
      <div class="flex flex-col  gap-4">
        <div @click="selectAnswer(1)" class="flex flex-row flex-nowrap w-96 h-9 items-center gap-4">

        <div :class="answerNumber != 0 ? 'size-8 rounded-full bg-lime-600' : 'size-8 rounded-full bg-black/40'">
        </div>
          <h4 class="text-base font-medium">apenas I,II,III</h4>
        </div>
        <div
          @click="selectAnswer(2)" class="flex flex-row flex-nowrap w-96 h-9 items-center gap-4">
          <div :class="answerNumber == 2 ? 'size-8 rounded-full bg-red-600' : 'size-8 rounded-full bg-black/40'">

        </div>
          <h4 class="text-base font-medium">apenas I,II,III</h4>
        </div>
        <div @click="selectAnswer(3)" class="flex flex-row flex-nowrap w-96 h-9 items-center gap-4">
        <div :class="answerNumber == 3 ? 'size-8 rounded-full bg-red-600' : 'size-8 rounded-full bg-black/40'">

        </div>
          <h4 class="text-base font-medium">apenas I,II,III</h4>
        </div>
      </div>
    </div>
  </ContainerDefault>
</template>
