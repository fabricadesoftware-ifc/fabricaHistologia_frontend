import api from '../../plugins/api';
const token = localStorage.getItem('psg_auth_token')

/**
 * Service class for handling species related operations.
 */
class SpecieService {
    /**
     * Retrieves all species.
     * @returns {Promise<Array>} A promise that resolves to an array of species.
     * @throws {Error} If an error occurs while retrieving the species.
     */
    async getSpecies(page = "") {
        try {
            const { data } = await api.get(`/species/?page=${page}`);
            return data;
        } catch (error) {
            console.log("error in getSpecies", error);
            throw error;
        }
    }

    async getAllSpecies() {
        try {
            const { data } = await api.get(`/species/?page_size=0`);
            return data;
        } catch (error) {
            console.log("error in getAllSpecies", error);
            throw error;
        }
    }


       async getSpeciesById(id) {
        try {
            const { data } = await api.get(`/species/${id}`);
            return data;
        } catch (error) {
            console.log("error in getSpeciesById", error);
            throw error;
        }
    }

    /**
     * Creates a new species.
     * @param {Object} newSpecie - The new species object to create.
     * @returns {Promise<Object>} A promise that resolves to the created species object.
     * @throws {Error} If an error occurs while creating the species.
     */
    async createSpecies(newSpecie) {
        try {
            const { data } = await api.post(`/species/`, newSpecie, {headers: {authorization: `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("error in createSpecies", error);
            throw error;
        }
    }

    /**
     * Updates an existing species.
     * @param {Object} specie - The species object to update.
     * @returns {Promise<Object>} A promise that resolves to the updated species object.
     * @throws {Error} If an error occurs while updating the species.
     */
    async updateSpecies(specie) {
        try {
            const { data } = await api.put(`/species/${specie.id}/`, specie, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return data.results;

        } catch (error) {
            console.log("error in updateSpecies", error);
            throw error;
        }
    }

    /**
     * Deletes a species by its ID.
     * @param {number} id - The ID of the species to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted species object.
     * @throws {Error} If an error occurs while deleting the species.
     */
    async deleteSpecies(id) {
        try {
            const { data } = await api.delete(`/species/${id}/`, {headers: {authorization: `Bearer ${token}`}});
            return data.results;
        } catch (error) {
            console.log("error in deleteSpecies", error);
            throw error;
        }
    }
}

export default new SpecieService();