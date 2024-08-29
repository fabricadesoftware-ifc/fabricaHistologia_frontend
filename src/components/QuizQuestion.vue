<script setup>
import ContainerDefault from '@/components/ContainerDefault.vue'
import AnswerQuiz from './AnswerQuiz.vue'


const datas = [
  {
    QuestionLetter: 'A',
    QuestionText: 'apenas I,II,III',
    AnswerNumber: 1
  },
  {
    QuestionLetter: 'B',
    QuestionText: 'apenas I,II,III',
    AnswerNumber: 2
  },
  {
    QuestionLetter: 'C',
    QuestionText: 'apenas I,II,III',
    AnswerNumber: 3
  }
]

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

      <div class="flex flex-col gap-4">
        <AnswerQuiz :datas="datas"></AnswerQuiz>
      </div>
      
    </div>
  </ContainerDefault>
</template>
