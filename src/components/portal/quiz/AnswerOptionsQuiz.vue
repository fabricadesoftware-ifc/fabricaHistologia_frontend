<script setup>
import {computed, ref} from 'vue'
import { useQuizStore } from '@/stores/blog/quiz';
import { selectAnswer, filterAnswer, watchAnswered, showRight, setBackground } from '@/utils/quiz';
const quizStore = useQuizStore()
const props = defineProps({
  data_answer: {
    type: Array
  },
})

const answered = ref(false)
const alphabet = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

const transform = (number) => {
  return alphabet.value[number]
}

const verifyAnswered = (answer) => {
  const getsaved =  quizStore.savedAnswers.filter(s => s.question_id == answer.question)
  return getsaved.length == 0 ? false : true
}

</script>

<template>
        <div v-for="(item, index) in props.data_answer" :key="index" class="flex flex-nowrap w-[100%] h-auto items-center gap-4 rounded-full sm:rounded-2xl py-1 px-3 cursor-pointer" :class="filterAnswer(item, quizStore) == undefined ? '' : item.correct ? 'bg-green-400' : 'bg-red-400'" @click="!verifyAnswered(item) ? selectAnswer(item, quizStore) : '', answered = true" :style="setBackground(item, verifyAnswered(item), quizStore)">

          <div class="size-8 rounded-full bg-black/30 flex items-center justify-center text-white">
            {{ transform(index) }}
          </div>
          <div class=" max-w-[90%] lg:max-w-[80%] sm:max-w-[70%] break-all">
          <h4 class="text-base md:text-sm sm:text-xs   font-medium">{{item.option}}</h4>
          <p class="text-sm md:text-sm sm:text-xs" v-show="verifyAnswered(item) && watchAnswered(item, quizStore) || setBackground(item, verifyAnswered(item), quizStore) != undefined" >{{item.comment_answer}}</p>
          </div>
        </div>
</template>
