<script setup>
import ContainerGlobal from '../../layout/ContainerGlobal.vue';
import AnswerQuiz from './AnswerOptionsQuiz.vue';
import Question from './Question.vue'


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
    QuestionLetter: 'Cu',
    QuestionText: 'apenas I,II,III',
    AnswerNumber: 3
  }
]

</script>

<template>
  <ContainerGlobal>
    <div class="flex flex-col gap-5 border border-gray-100 p-6 rounded-lg">
      <Question/>

      <div class="flex flex-col gap-4">
        <AnswerQuiz :datas="datas"></AnswerQuiz>
      </div>
      
    </div>
  </ContainerGlobal>
</template>
