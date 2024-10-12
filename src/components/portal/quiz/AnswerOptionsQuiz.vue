<script setup>
import {computed, ref} from 'vue'
import { useQuizStore } from '@/stores/blog/quiz';
import { answered, selectAnswer, filterAnswer, watchAnswered, showRight, setBackground } from '@/utils/quiz';
const quizStore = useQuizStore()
const props = defineProps({
  data_answer: {
    type: Array
  },
})

const showCorrect = ref(null)

</script>

<template>
        
        <div v-for="(item, index) in props.data_answer" :key="index" class="flex flex-nowrap w-[100%] h-auto items-center gap-4 rounded-md p-1" :class="filterAnswer(item) == undefined ? '' : item.correct ? 'bg-green-400' : 'bg-red-400'" @click="!answered ? selectAnswer(item) : ''" :style="setBackground(item)">
          <div class="size-8 rounded-full bg-black/30 flex items-center justify-center text-white">
            {{ index }}
          </div>
          <div class=" max-w-[90%] lg:max-w-[80%] sm:max-w-[70%] break-all">
          <h4 class="text-base font-medium">{{item.option}}</h4>
          <p v-show="answered && watchAnswered(item) || setBackground(item) != undefined" >{{item.comment_answer}}</p>
          </div>
        </div>
</template>
