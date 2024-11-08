import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { QuizService } from "@/services";
import { useStorage } from "@vueuse/core";

/**
 * Store for managing post data.
 * @typedef {Object} posttore
 * @property {Object} state - The state object containing post data.
 * @property {Array} state.post - The array of post.
 * @property {Object|null} state.selectedPost - The currently selected Post.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} postCount - Computed property indicating the number of post.
 * @property {Function} getPost - Function to fetch post data.
 * @property {Function} createPost - Function to create a new Post.
 * @property {Function} updatePost - Function to update an existing Post.
 * @property {Function} deletePost - Function to delete a Post.
 */

/**
 * Creates a new instance of the postStore.
 * @function usePostStore
 * @returns {postStore} The postStore instance.
 */

export const useQuizStore = defineStore("quiz",
    () => {
        const state = useStorage('quizStorage', {
            quiz: [],
            answers: [],
            quizBySystem: [],
            answersByQuestion: [],
            selectedQuiz: null,
            selectedAnswers: [],
            savedAnswers: [],
            markedAnswers: [],
            selectedLevel: null,
            loading: false,
            error: null,
            connection: false,
            
        })

        const answers = computed(() => state.value.answers)
        const quiz = computed(() => state.value.quiz)
        const selectedQuiz = computed(()=> state.value.selectedQuiz)
        const selectedAnswers = computed(()=> state.value.selectedAnswers)
        const savedAnswers = computed(()=> state.value.savedAnswers)
        const isLoading = computed(() => state.value.loading);
        const answersCount = computed(() => state.value.answers.length);
        const quizCount = computed(() => state.value.quiz.length);
        const answersByQuestion = computed(()=> state.value.answersByQuestion)
        const quizBySystem = computed(()=> state.value.quizBySystem)
        const markedAnswers = computed(()=> state.value.markedAnswers)
        const selectedLevel = computed(()=> state.value.selectedLevel)
       
        const countSavedAnswers = computed(()=> {
            const correctAnswers = state.value.savedAnswers.filter(s => s.correct == true)
            return correctAnswers.length
        })
        
        
        /**
         * Fetches post data.
         * @async
         * @function getPosts
         */
        const getQuiz = async () => {
            state.value.loading = true;
            try {
                const response = await QuizService.getQuiz();
                state.value.quiz = response
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
                state.value.connection = true; // just to see if the connection is established
            }
        };

        const getAnswers = async () => {
            state.value.loading = true;
            try {
                const response = await QuizService.getAnswers();
                state.value.answers = response
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
                state.value.connection = true; // just to see if the connection is established
            }
        };

        const getQuizBySystem = async (system_id, level) => {
            state.value.loading = true;
            try {
                const response = await QuizService.getQuizBySystem(system_id, level)
                state.value.quizBySystem = response
                
            } catch (error) {
                state.value.error = error
            } finally {
                state.value.loading = false
                state.value.connection = true
            }
        }

        const getAnswersByQuestion = async (id) => {
            state.value.loading = true;
            try {
                    state.value.answersByQuestion = await QuizService.getAnswersByQuestion(id)
                
            } catch (error) {
                state.value.error = error
            } finally {
                state.value.loading = false
                state.value.connection = true
            }
        }

        const getMarkedAnswers = () => {
            for (let i = 0; i < quizBySystem.value.length; i++) {
                const response = {
                        id: quizBySystem.value[i].id,
                        correct: false,
                        answered: false,
                }
                state.value.markedAnswers.push(response)
                }
                
                
            }
        
        

        
        /**
         * Creates a new post.
         * @async
         * @function createPost
         * @param {Object} newPosts - The new Posts object to create.
         */
        const createQuiz = async (newQuiz) => {
            state.value.loading = true;
            try {
                state.value.quiz.push(await QuizService.createQuiz(newQuiz));
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
            }
        };

        const createAnswers = async (newAnswer) => {
            state.value.loading = true;
            try {
                state.value.answers.push(await QuizService.createQuiz(newAnswer));
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
            }
        };
        
        /**
         * Updates an existing post.
         * @async
         * @function updatePosts
         * @param {Object} PosupdatePosts - The PosupdatePosts object to update.
         */
        const updateQuiz = async (quiz) => {
            state.value.loading = true;
            try {
                const index = state.value.quiz.findIndex((s) => s.id === quiz.id);
                state.value.quiz[index] = await QuizService.updateQuiz(quiz);
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
            }
        };

        const updateAnswers = async (answer) => {
            state.value.loading = true;
            try {
                const index = state.value.answers.findIndex((s) => s.id === answer.id);
                state.value.answers[index] = await QuizService.updateAnswers(answer);
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
            }
        };

        /**
         * Deletes a post.
         * @async
         * @function deletePosts
         * @param {number} id - The ID of the Posts to delete.
        */
       const deleteQuiz = async (id) => {
           state.value.loading = true;
           try {
               const index = state.value.quiz.findIndex((s) => s.id === id);
               state.value.quiz.splice(index, 1);
               await QuizService.deleteQuiz(id);
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
            }
        };

        const deleteAnswers = async (id) => {
            state.value.loading = true;
            try {
                const index = state.value.answers.findIndex((s) => s.id === id);
                state.value.answers.splice(index, 1);
                await QuizService.deleteAnswers(id);
             } catch (error) {
                 state.value.error = error;
             } finally {
                 state.value.loading = false;
             }
         };
        
        return {
            state,
            isLoading,
            quizCount,
            answersCount,
            quiz,
            answers,
            selectedAnswers,
            quizBySystem,
            answersByQuestion,
            savedAnswers,
            markedAnswers,
            selectedLevel,
            selectedQuiz,
            getMarkedAnswers,
            countSavedAnswers,
            getQuiz,
            getAnswers,
            getQuizBySystem,
            getAnswersByQuestion,
            createQuiz,
            createAnswers,
            updateQuiz,
            updateAnswers,
            deleteQuiz,
            deleteAnswers,
        };
        
    }
)
