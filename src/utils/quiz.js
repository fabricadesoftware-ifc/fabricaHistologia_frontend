import {ref} from 'vue'
import { useQuizStore } from "@/stores/blog/quiz"
const quizStore = useQuizStore()

export const quizHomeButtonsData = [
    {color: 'bg-[#267A7A]', text: 'Fácil'},
    {color: 'bg-[#1F94C7]', text: 'Médio'},
    {color: 'bg-[#D94E4E]', text: 'Difícil'},
]

export const answered = ref(false)

export const selectAnswer = async (answer) => {
    answered.value = true
    if (quizStore.state.selectedAnswers.filter(s => s.id == answer.id).length == 0) {
     quizStore.state.selectedAnswers.push(answer)
      }
     const index = quizStore.selectedAnswers.findIndex(s => s.id == answer.id)
     console.log(quizStore.selectedAnswers)
     return quizStore.selectedAnswers[index].correct
  }
  
export const filterAnswer = (answer) => {
    if (quizStore.state.selectedAnswers.filter(s => s.id == answer.id).length > 0) {
    const index = quizStore.selectedAnswers.findIndex(s => s.id == answer.id)
    console.log(quizStore.selectedAnswers[index].correct)
    return quizStore.selectedAnswers[index].correct
    }
  }
  
export const watchAnswered = (answer) => {
    if (quizStore.state.selectedAnswers.filter(s => s.id == answer.id).length > 0) {
    const index = quizStore.selectedAnswers.findIndex(s => s.id == answer.id)
    return quizStore.selectedAnswers[index]
    }
  }
  
export const showRight = (item) => {
    if (item.correct) {
    const index = quizStore.answersByQuestion.findIndex(s => s.correct == item.correct)
    return quizStore.answersByQuestion[index]
    }
  }
  
export const setBackground = (item) => {
    if (answered.value && showRight(item)) {
      return {backgroundColor: '#4ade80'}
    }
  }