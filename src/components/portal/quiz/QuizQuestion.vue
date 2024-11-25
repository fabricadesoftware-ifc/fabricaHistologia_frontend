<script setup>
import {ref} from 'vue'
import ContainerGlobal from '../../layout/ContainerGlobal.vue';
import AnswerQuiz from './AnswerOptionsQuiz.vue';
import Question from './Question.vue'

const props = defineProps({
  data_question: {
    type: Array
  },
  data_answer: {
    type: Array
  },
  currentQuestion: {
    type: Number,
  }
})
</script>

<template>
  <ContainerGlobal>
    <div class="flex flex-col gap-5 border-2   border-[rgb(246 232 240)] shadow-lg p-6 rounded-lg">
      <Question v-for="item, index in props.data_question" :data-question="item" :key="index" :index="item.id" v-show="props.currentQuestion == item.id"/>
      <div class="flex flex-col gap-4">
        <AnswerQuiz :data_answer="props.data_answer" />
      </div>
      
    </div>
  </ContainerGlobal>
</template>
