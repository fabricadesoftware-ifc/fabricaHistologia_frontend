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
  index: {
    type: Number
  }
})

const currentQuestion = ref(1)
</script>

<template>
  <ContainerGlobal>
    <div class="flex flex-col gap-5 border border-gray-100 p-6 rounded-lg">
      <Question :data_question="item" :index="item.position" v-for="item, index in props.data_question" :key="index"  v-show="currentQuestion == item.position"/>

      <div class="flex flex-col gap-4">
        <AnswerQuiz :data_answer="props.data_answer" />
      </div>
      
    </div>
  </ContainerGlobal>
</template>
