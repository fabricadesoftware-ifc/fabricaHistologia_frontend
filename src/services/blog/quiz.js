import api from "@/plugins/api";
const token = localStorage.getItem('psg_auth_token')

/**
 * Service class for handling slides related options
 */
class QuizService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getQuiz() {
        try {
            const { data } = await api.get('/quiz', {headers: {'authorization': `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("Service: GetQuiz - return error", error);
            throw error;
        }
    }
    
    async getAnswers() {
        try {
            const { data } = await api.get('/answer', {headers: {'authorization': `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("Service: GetAnswer - return error", error);
            throw error;
        }
    }
    
    async getAnswersByQuestion(question_id) {
        try {
            const {data} = await api.get(`/answer/?question_id=${question_id}`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getAnswerByQuestion', error);
            throw error;
        }
    }

    async getQuizBySystem(system_id) {
        try {
            const {data} = await api.get(`/quiz/?system_id=${system_id}`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getQuizBySystem', error);
            throw error;
        }
    }

    /**
     * Creates a new Slide
     * @param {Object} newSlide - The new slide to be created 
     * @returns {Promise<Object>} A promise that resolves to the created slides Object
     * @throws {Error} If an error occurs while creating the slide
     */
    async createAnswers(newAnswer) {
        try {
            const { data } = await api.post('/answer/', newAnswer, {headers: {'authorization': `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("Service: AddAnswer - return error", error);
            throw error;
        }
    }
    
    async createQuiz(newQuiz) {
        try {
            const { data } = await api.post('/quiz/', newQuiz, {headers: {'authorization': `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("Service: AddQuiz - return error", error);
            throw error;
        }
    }

    /**
     * Updates an existing slide
     * @param {Object} slide - The updated slide to be saved
     * @param {Object} id - The slide id to be saved
     * @returns {Promise<Object>} A promise that resolves to the updated slides Object
     * @throws {Error} If an error occurs while updating the slide
     */
    async updateAnswers(answer) {
        try {
            const { data } = await api.put(`/answer/${answer.id}/`, answer, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: UpdatePost - return success")
            return data.results;
        } catch (error) {
            console.log("Service: UpdatePost - return error", error);
            throw error;
        }
    }

    async updateQuiz(quiz) {
        try {
            const { data } = await api.put(`/quiz/${quiz.id}/`, quiz, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: UpdateQuiz - return success")
            return data.results;
        } catch (error) {
            console.log("Service: UpdateQuiz - return error", error);
            throw error;
        }
    }

    /**
     * Delete an exiting slide
     * @param {number} idSlide - The Id of the slide to be deleted
     * @returns {Promise<Object>} A promise that resolves to the deleted slide object.
     * @throws {Error} If an error occurs while deleting the slide
     */
    async deleteAnswers(id) {
        try {
            const { data } = await api.delete(`/answer/${id}`, {headers: {'authorization': `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("Service: DeleteAnswer - return error", error);
            throw error;
        }
    }

    async deleteQuiz(id) {
        try {
            const { data } = await api.delete(`/quiz/${id}`, {headers: {'authorization': `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("Service: DeleteQuiz - return error", error);
            throw error;
        }
    }
}

export default new QuizService();