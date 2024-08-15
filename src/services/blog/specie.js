import api from '../../plugins/api';

/**
 * Service class for handling species related operations.
 */
class SpecieService {
    /**
     * Retrieves all species.
     * @returns {Promise<Array>} A promise that resolves to an array of species.
     * @throws {Error} If an error occurs while retrieving the species.
     */
    async getSpecies() {
        try {
            const { data } = await api.get(`/species`);
            return data.results;
        } catch (error) {
            console.log("error in getSpecies", error);
            throw error;
        }
    }

    /**
     * Creates a new species.
     * @param {Object} newSpecie - The new species object to create.
     * @returns {Promise<Object>} A promise that resolves to the created species object.
     * @throws {Error} If an error occurs while creating the species.
     */
    async createSpecie(newSpecie) {
        console.log('Dados enviados:', newSpecie);
        try {
            const { data } = await api.post(`/species/`, newSpecie);
            return data;
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
    async updateSpecie(specie) {
        try {
            const { data } = await api.put(`/species/${specie.id}/`, specie);
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
    async deleteSpecie(id) {
        try {
            const { data } = await api.delete(`/species/${id}/`);
            return data.results;
        } catch (error) {
            console.log("error in deleteSpecies", error);
            throw error;
        }
    }
}

export default new SpecieService();