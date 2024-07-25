import api from "@/plugins/api";

/**
 * Service class for handling slides related options
 */
class SlideService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getSlides() {
        try {
            const { data } = await api.get('/slide');
            return data.results;
        } catch (error) {
            console.log("error in get Slide", error);
            throw error;
        }
    }

    /**
     * Creates a new Slide
     * @param {Object} newSlide - The new slide to be created 
     * @returns {Promise<Object>} A promise that resolves to the created slides Object
     * @throws {Error} If an error occurs while creating the slide
     */
    async postSlides(newSlide) {
        try {
            const { data } = await api.post('/slide/', newSlide);
            return data.results;
        } catch (error) {
            console.log("error in post Slide", error);
            throw error;
        }
    }

    /**
     * Updates an existing slide
     * @param {Object} slide - The updated slide to be saved
     * @returns {Promise<Object>} A promise that resolves to the updated slides Object
     * @throws {Error} If an error occurs while updating the slide
     */
    async updateSlides(slide) {
        try {
            const { data } = await api.put(`/slide/${slide}`);
            return data.results;
        } catch (error) {
            console.log("error in update Slide", error);
            throw error;
        }
    }

    /**
     * Delete an exiting slide
     * @param {number} idSlide - The Id of the slide to be deleted
     * @returns {Promise<Object>} A promise that resolves to the deleted slide object.
     * @throws {Error} If an error occurs while deleting the slide
     */
    async deleteSlides(idSlide) {
        try {
            const { data } = await api.post(`/slide/${idSlide}`);
            return data.results;
        } catch (error) {
            console.log("error in delete Slide", error);
            throw error;
        }
    }
}

export default new SlideService();