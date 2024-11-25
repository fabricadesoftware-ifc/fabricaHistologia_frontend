import api from "@/plugins/api";
const token = localStorage.getItem('psg_auth_token')

/**
 * Service class for handling slides related options
 */
class PointService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getPoints() {
        try {
            const { data } = await api.get('/points');
            console.log( "Service: GetPost - return success")
            return data.results;
        } catch (error) {
            console.log("Service: GetPost - return error", error);
            throw error;
        }
    }

    async getPointsByPost(post_id) {
        try {
            const {data} = await api.get(`/points/?posts_id=${post_id}`);
            return data.results
        } catch (error) {
            console.log('Error in getPointsByPost', error);
            throw error;
        }
    }

    /**
     * Creates a new Slide
     * @param {Object} newSlide - The new slide to be created 
     * @returns {Promise<Object>} A promise that resolves to the created slides Object
     * @throws {Error} If an error occurs while creating the slide
     */
    async createPoint(newPoint) {
        try {
            const { data } = await api.post('/points/', newPoint, {headers: {authorization: `Bearer ${token}`}});
            console.log( "Service: AddPoint - return success")
            return data.results;
        } catch (error) {
            console.log("Service: AddPoint - return error", error);
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
    async updatePoints(point, id) {
        try {
            const { data } = await api.put(`/points/${id}/`, point, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: UpdatePoint - return success")
            return data.results;
        } catch (error) {
            console.log("Service: UpdatePoint - return error", error);
            throw error;
        }
    }

    /**
     * Delete an exiting slide
     * @param {number} idSlide - The Id of the slide to be deleted
     * @returns {Promise<Object>} A promise that resolves to the deleted slide object.
     * @throws {Error} If an error occurs while deleting the slide
     */
    async deletePoints(idPoint) {
        try {
            const { data } = await api.delete(`/points/${idPoint}`, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: DeletePoint - return success")
            return data.results;
        } catch (error) {
            console.log("Service: DeletePoint - return error", error);
            throw error;
        }
    }
}

export default new PointService();