import {ref} from 'vue'
import { useQuizStore } from "@/stores/blog/quiz"
const quizStore = useQuizStore()

export const quizHomeButtonsData = [
    {color: 'bg-[#267A7A]', text: 'Fácil'},
    {color: 'bg-[#1F94C7]', text: 'Médio'},
    {color: 'bg-[#D94E4E]', text: 'Difícil'},
]

export const selectAnswer = async (answer) => {
    if (quizStore.selectedAnswers.filter(s => s.id == answer.id).length == 0) {
     quizStore.state.selectedAnswers.push(answer)
     const index = quizStore.selectedAnswers.findIndex(s => s.id == answer.id)
     
     const saveddata = (correct, question_id) => {
      return {
        id: answer.id,
        correct: correct,
        question_id: question_id,
        answered: true
      }
     }
     quizStore.state.savedAnswers.push(saveddata(quizStore.selectedAnswers[index].correct, answer.question))
     quizStore.state.markedAnswers[answer.question - 1].correct = quizStore.savedAnswers[index].correct
     quizStore.state.markedAnswers[answer.question - 1].answered = true
     return quizStore.selectedAnswers[index].correct
    }
     
  }
  
export const filterAnswer = (answer) => {
    if (quizStore.savedAnswers.filter(s => s.id == answer.id).length > 0) {
    const index = quizStore.savedAnswers.findIndex(s => s.id == answer.id)
    console.log(quizStore.savedAnswers[index].correct)
    return quizStore.savedAnswers[index].correct
    }
  }
  
export const watchAnswered = (answer) => {
    if (quizStore.savedAnswers.filter(s => s.id == answer.id).length > 0) {
    const index = quizStore.savedAnswers.findIndex(s => s.id == answer.id)
    return quizStore.savedAnswers[index]
    }
  }
  
export const showRight = (item) => {
    if (item.correct) {
    const index = quizStore.answersByQuestion.findIndex(s => s.correct == item.correct)
    return quizStore.answersByQuestion[index]
    }
  }
  
export const setBackground = (item, answered) => {
    if (answered && showRight(item)) {
      return {backgroundColor: '#4ade80'}
    }
  }