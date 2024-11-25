import {ref} from 'vue'
import { useQuizStore } from "@/stores"


let quizStore = null

setTimeout(()=>{
  quizStore = useQuizStore()
},1000)

export const choseNumbs = (between) => {
   return (Math.round(Math.random() * between))
}

export const verifyManyQuiz = () => {
    return Math.min(quizStore.quizBySystem.length, 10)
}

export const throwQuizes = () => {
    const quizCount = verifyManyQuiz()
    quizStore.state.quizBySystem = quizStore.state.quizBySystem.slice(0, quizCount).sort(()=> Math.random() - 0.5)
    console.log(quizStore.quizBySystem)
  
 
}

export const quizHomeButtonsData = [
    {color: 'bg-[#267A7A]', text: 'Fácil', value: 1, link: '/portal/quiz/'},
    {color: 'bg-[#1F94C7]', text: 'Médio', value: 2, link: '/portal/quiz/'},
    {color: 'bg-[#D94E4E]', text: 'Difícil', value: 3, link: '/portal/quiz/'},
]

export const selectAnswer = async (answer, store) => {
    if (store.selectedAnswers.filter(s => s.id == answer.id).length == 0) {
     store.state.selectedAnswers.push(answer)
     const index = store.selectedAnswers.findIndex(s => s.id == answer.id)
     
     const saveddata = (correct, question_id) => {
      return {
        id: answer.id,
        correct: correct,
        question_id: question_id,
        answered: true
      }
     }
     store.state.savedAnswers.push(saveddata(store.selectedAnswers[index].correct, answer.question))
    //  console.log(store.savedAnswers[])
     store.state.markedAnswers[index].correct = store.savedAnswers[index].correct
     store.state.markedAnswers[index].answered = true
     return store.selectedAnswers[index].correct
    }
     
  }



  export const resetAll = (store) => {
    localStorage.removeItem('quizStorage')
    store.state.quiz = []
    store.state.answers = []
    store.state.quizBySystem = []
    store.state.answersByQuestion = []
    store.state.selectedQuiz = null
    store.state.selectedAnswers = []
    store.state.savedAnswers = []
    store.state.markedAnswers = []
    store.state.selectedLevel = null
  }
  
export const filterAnswer = (answer, store) => {
    if (store.savedAnswers.filter(s => s.id == answer.id).length > 0) {
    const index = store.savedAnswers.findIndex(s => s.id == answer.id)
    console.log(store.savedAnswers[index].correct)
    return store.savedAnswers[index].correct
    }
  }
  
export const watchAnswered = (answer, store) => {
    if (store.savedAnswers.filter(s => s.id == answer.id).length > 0) {
    const index = store.savedAnswers.findIndex(s => s.id == answer.id)
    return store.savedAnswers[index]
    }
  }
  
export const showRight = (item, store) => {
    if (item.correct) {
    const index = store.answersByQuestion.findIndex(s => s.correct == item.correct)
    return store.answersByQuestion[index]
    }
  }
  
export const setBackground = (item, answered, store) => {
    if (answered && showRight(item, store)) {
      return {backgroundColor: '#4ade80'}
    }
  }

  export const adjusteSize = (item, lenght, index) => {
    if (item.length > lenght) {
        item = item.replace(item.substring(index), '') + '...'
    }
    return item
}