import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { QuizService } from "@/services";

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
        const state = reactive({
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
        });
        const answers = computed(() => state.answers)
        const quiz = computed(() => state.quiz)
        const selectedQuiz = computed(()=> state.selectedQuiz)
        const selectedAnswers = computed(()=> state.selectedAnswers)
        const savedAnswers = computed(()=> state.savedAnswers)
        const isLoading = computed(() => state.loading);
        const answersCount = computed(() => state.answers.length);
        const quizCount = computed(() => state.quiz.length);
        const answersByQuestion = computed(()=> state.answersByQuestion)
        const quizBySystem = computed(()=> state.quizBySystem)
        const markedAnswers = computed(()=> state.markedAnswers)
        const selectedLevel = computed(()=> state.selectedLevel)

        /**
         * Fetches post data.
         * @async
         * @function getPosts
         */
        const getQuiz = async () => {
            state.loading = true;
            try {
                const response = await QuizService.getQuiz();
                state.quiz = response
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
                state.connection = true; // just to see if the connection is established
            }
        };

        const getAnswers = async () => {
            state.loading = true;
            try {
                const response = await QuizService.getAnswers();
                state.answers = response
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
                state.connection = true; // just to see if the connection is established
            }
        };

        const getQuizBySystem = async (system_id, level) => {
            state.loading = true;
            try {
                const response = await QuizService.getQuizBySystem(system_id, level)
                state.quizBySystem = response
                
            } catch (error) {
                state.error = error
            } finally {
                state.loading = false
                state.connection = true
            }
        }

        const getAnswersByQuestion = async (id) => {
            state.loading = true;
            try {
                    state.answersByQuestion = await QuizService.getAnswersByQuestion(id)
                
            } catch (error) {
                state.error = error
            } finally {
                state.loading = false
                state.connection = true
            }
        }

        const getMarkedAnswers = () => {
            for (let i = 0; i < quizBySystem.value.length; i++) {
                const response = {
                        id: quizBySystem.value[i].id,
                        correct: false,
                        answered: false,
                }
                state.markedAnswers.push(response)
                }
                
                
            }
        

        
        /**
         * Creates a new post.
         * @async
         * @function createPost
         * @param {Object} newPosts - The new Posts object to create.
         */
        const createQuiz = async (newQuiz) => {
            state.loading = true;
            try {
                state.quiz.push(await QuizService.createQuiz(newQuiz));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const createAnswers = async (newAnswer) => {
            state.loading = true;
            try {
                state.answers.push(await QuizService.createQuiz(newAnswer));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };
        
        /**
         * Updates an existing post.
         * @async
         * @function updatePosts
         * @param {Object} PosupdatePosts - The PosupdatePosts object to update.
         */
        const updateQuiz = async (quiz) => {
            state.loading = true;
            try {
                const index = state.quiz.findIndex((s) => s.id === quiz.id);
                state.quiz[index] = await QuizService.updateQuiz(quiz);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const updateAnswers = async (answer) => {
            state.loading = true;
            try {
                const index = state.answers.findIndex((s) => s.id === answer.id);
                state.answers[index] = await QuizService.updateAnswers(answer);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        /**
         * Deletes a post.
         * @async
         * @function deletePosts
         * @param {number} id - The ID of the Posts to delete.
        */
       const deleteQuiz = async (id) => {
           state.loading = true;
           try {
               const index = state.quiz.findIndex((s) => s.id === id);
               state.quiz.splice(index, 1);
               await QuizService.deleteQuiz(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const deleteAnswers = async (id) => {
            state.loading = true;
            try {
                const index = state.answers.findIndex((s) => s.id === id);
                state.answers.splice(index, 1);
                await QuizService.deleteAnswers(id);
             } catch (error) {
                 state.error = error;
             } finally {
                 state.loading = false;
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
