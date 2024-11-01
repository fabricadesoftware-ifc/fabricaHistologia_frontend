import {ref} from 'vue'
import { useQuizStore } from "@/stores"


let quizStore = null

setTimeout(()=>{
  quizStore = useQuizStore()
},2000)


export const systemGeral = ref([])

export const choseNumbs = (between) => {
   return (Math.round(Math.random() * between))
}

export const verifyManyQuiz = () => {
    quizStore.quizBySystem.length < 10 ? quizStore.quiz.length : 10 
}

export const throwQuizes = () => {
  while (systemGeral.value < verifyManyQuiz()) {
      // const numb = choseNumbs(quizStore.quizBySystem.length)
      const numb = choseNumbs(quizStore.quizBySystem.length)
      if (systemGeral.value.filter(s => s == numb).length == 0) {
          systemGeral.value.push(numb)
      }
  }
  console.log(systemGeral.value)
}

export const quizHomeButtonsData = [
    {color: 'bg-[#267A7A]', text: 'Fácil', value: 1, link: '/portal/quiz/'},
    {color: 'bg-[#1F94C7]', text: 'Médio', value: 2, link: '/portal/quiz/'},
    {color: 'bg-[#D94E4E]', text: 'Difícil', value: 3, link: '/portal/quiz/'},
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

  export const resetAll = () => {
    quizStore.state.quiz = []
    quizStore.state.answers = []
    quizStore.state.quizBySystem = []
    quizStore.state.answersByQuestion = []
    quizStore.state.selectedQuiz = null
    quizStore.state.selectedAnswers = []
    quizStore.state.savedAnswers = []
    quizStore.state.markedAnswers = []
    quizStore.state.selectedLevel = null
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