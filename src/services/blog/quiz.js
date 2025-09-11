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
    async getQuiz(page = "") {
        try {
            const { data } = await api.get(`/quiz/?page=${page}`);
            return data;
        } catch (error) {
            console.log("Service: GetQuiz - return error", error);
            throw error;
        }
    }

    async getQuizBySearch(search) {
        try {
            const { data } = await api.get(`/quiz/?question=${search}`);
            return data;
        } catch (error) {
            console.log("Service: GetQuiz - return error", error);
            throw error;
        }
    }

    async getAllQuizes() {
    try {
      const { data } = await api.get(`/quiz/?page_size=0`, {headers: {'authorization': `Bearer ${token}`,  "Content-Type": 'multipart/form-data'}})
      console.log('all quizes response:', data);
      return data
    } catch (error) {
      console.log('error in getAllQuizes', error)
      throw error
    }
  }
    
    async getAnswers(page = "") {
        try {
            const { data } = await api.get(`/answer/?page=${page}`);
            return data.results;
        } catch (error) {
            console.log("Service: GetAnswer - return error", error);
            throw error;
        }
    }
    
    async getAnswersByQuestion(question_id) {
        try {
            const {data} = await api.get(`/answer/?question_id=${question_id}`);
        return data.results
        } catch (error) {
            console.log('Error in getAnswerByQuestion', error);
            throw error;
        }
    }

       async getQuizById(quiz_id) {
        try {
            const { data } = await api.get(`/quiz/${quiz_id}/`);
            return data;
        } catch (error) {
            console.log("Service: GetQuiz - return error", error);
            throw error;
        }
    }

     async getAnswerById(answer_id) {
        try {
            const { data } = await api.get(`/answer/${answer_id}/`);
            console.log(data)
            return data;
        } catch (error) {
            console.log("Service: GetAnswer - return error", error);
            throw error;
        }
    }


    async getQuizBySystem(system_id, level) {
        try {
            const {data} = await api.get(`/quiz/?level=${level}&system_id=${system_id}`);
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

    async createAnswersBulk(newAnswers) {
        try {
            const { data } = await api.post('/answer/bulk-create/', newAnswers, {headers: {'authorization': `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("Service: AddAnswerBulk - return error", error);
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
        console.log('to maluco')
        try {
            console.log('aqtbm')
            const { data } = await api.put(`/answer/${answer.id}/`, answer, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log( "Service: UpdatePost - return success")
            return data;
        } catch (error) {
            console.log('aqtbm')

            console.log("Service: UpdatePost - return error", error);
            throw error;
        }
    }

    async updateQuiz(quiz) {
        console.log('[DEBUG] Função send disparada')

        try {

            const { data } = await api.put(`/quiz/${quiz.id}/`, quiz, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log( "Service: UpdateQuiz - return success")
            return data;
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
            const { data } = await api.delete(`/answer/${id}/`, {headers: {'authorization': `Bearer ${token}`}});
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
    async getRanking(level) {
  try {
    const { data } = await api.get(`/score/ranking/?level=${level}`);
    return data;
  } catch (error) {
    console.log("Service: GetRanking - return error", error);
    throw error;
  }
}
// ------------------- SCORE -------------------

async createScore(newScore) {
  try {
    const { data } = await api.post('/score/', newScore, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return data
  } catch (error) {
    console.log("Service: CreateScore - error", error)
    throw error
  }
}

async getScores(params = {}) {
  try {
    const query = new URLSearchParams(params).toString()
    const { data } = await api.get(`/score/?${query}`)
    return data
  } catch (error) {
    console.log("Service: GetScores - error", error)
    throw error
  }
}

async getScoreById(id) {
  try {
    const { data } = await api.get(`/score/${id}/`)
    return data
  } catch (error) {
    console.log("Service: GetScoreById - error", error)
    throw error
  }
}

async deleteScore(id) {
  try {
    await api.delete(`/score/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return true
  } catch (error) {
    console.log("Service: DeleteScore - error", error)
    throw error
  }
}


}

export default new QuizService();