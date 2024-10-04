import api from "@/plugins/api";
const token = localStorage.getItem('psg_auth_token')

/**
 * Service class for handling slides related options
 */
class PostService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getPosts() {
        try {
            const { data } = await api.get('/posts', {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: GetPost - return success")
            return data.results;
        } catch (error) {
            console.log("Service: GetPost - return error", error);
            throw error;
        }
    }

    async getPostsByOrganAndType(organ_id, type_post) {
        try {
            const {data} = await api.get(`/posts/?organ_id=${organ_id}&page=&species_id=&type_post=${type_post}`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getPostsbyOrgan', error);
            throw error;
        }
    }

    /**
     * Creates a new Slide
     * @param {Object} newSlide - The new slide to be created 
     * @returns {Promise<Object>} A promise that resolves to the created slides Object
     * @throws {Error} If an error occurs while creating the slide
     */
    async createPost(newPost) {
        try {
            const { data } = await api.post('/posts/', newPost, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: AddPost - return success")
            return data.results;
        } catch (error) {
            console.log("Service: AddPost - return error", error);
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
    async updatePosts(post, id) {
        try {
            const { data } = await api.put(`/posts/${id}/`, post, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: UpdatePost - return success")
            return data.results;
        } catch (error) {
            console.log("Service: UpdatePost - return error", error);
            throw error;
        }
    }

    /**
     * Delete an exiting slide
     * @param {number} idSlide - The Id of the slide to be deleted
     * @returns {Promise<Object>} A promise that resolves to the deleted slide object.
     * @throws {Error} If an error occurs while deleting the slide
     */
    async deletePosts(idPost) {
        try {
            const { data } = await api.delete(`/posts/${idPost}`, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: DeletePost - return success")
            return data.results;
        } catch (error) {
            console.log("Service: DeletePost - return error", error);
            throw error;
        }
    }
}

export default new PostService();