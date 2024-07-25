import api from '../../plugins/api'

/**
 * Service class for handling organs related operations.
 */
class OrganService {
    /**
     * retrieves all species.
     * @returns {Promise<Array>} A promise that resolves to an array of organs.
     * @throws {Error} If an error occurs while retrieving the organs.
     */
    async getOrgans(){
        try{
            const { data } = await api.get(`/organs`)
            return data.results;
        } catch (error){
            console.log("error in getOrgans", error);
            throw error;
        }
    }

    /**
     * Creates a new organs.
     * @param {Object} newOrgan - The new organs object to create.
     * @returns {Promise<Object>} A promise that resolves to the created organs object.
     * @throws {Error} If an error occurs while creating the organs.
     */
    async createOrgans(newOrgan) {
        try {
            const { data } = await api.post(`/organs`, newOrgan);
            return data.results;
        } catch (error) {
            console.log("error in createOrgans", error);
            throw error;
        }
    }

    /**
     * Updates an existing organs.
     * @param {Object} organ- The organs object to update.
     * @returns {Promise<Object>} A promise that resolves to the updated organs object.
     * @throws {Error} If an error occurs while updating the organs.
     */
    async updateOrgans(organ) {
        try {
            const { data } = await api.put(`/organs/${organ.id}/`);
            return data.results;
        } catch (error) {
            console.log("error in updateOrgans", error);
            throw error;
        }
    }

    /**
     * Deletes a organs by its ID.
     * @param {number} id - The ID of the organs to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted organs object.
     * @throws {Error} If an error occurs while deleting the organs.
     */
    async deleteOrgans(id) {
        try {
            const { data } = await api.delete(`/organs/${id}/`);
            return data.results;
        } catch (error) {
            console.log("error in deleteOrgans", error);
            throw error;
        }
    }
}

export default new OrganService();