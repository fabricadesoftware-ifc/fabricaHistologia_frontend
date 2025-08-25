import api from "@/plugins/api";
const authToken = localStorage.getItem('psg_auth_token'); 

/**
 * Service class for handling systems related operations.
 */
class SystemService {
    /**
     * Retrieves all systems.
     * @returns {Promise<Array>} A promise that resolves to an array of systems.
     * @throws {Error} If an error occurs while retrieving the systems.
     */
    async getSystems (page = "") {
        try {
            const {data} = await api.get(`/systems/?page=${page}`);
            return data;
        } catch (error) {
            console.log("error in getSystem", error);
            throw error;
        }
    }

    /**
     * Retrieves all systems.
    * @returns {Promise<Array>} A promise that resolves to an array of systems.
    * @throws {Error} If an error occurs while retrieving the systems.
    */
    async getSystemById (id) {
        try {
            console.log(id)
            const {data} = await api.get('/systems/' + id + '/');
            console.log(data)
            return data;
        } catch (error) {
            console.log("error in getSystem", error);
            throw error;
        }
    }

     /**
     * Creates a new systems.
     * @param {Object} newSystem - The new systems object to create.
     * @returns {Promise<Object>} A promise that resolves to the created systems object.
     * @throws {Error} If an error occurs while creating the systems.
     */
    async createSystems (newSystem) {
        try {
            const {data} = await api.post('/systems/', newSystem, {
                 headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return data.results;
        } catch (error) {
            console.log("error in postSystem", error);
            throw error;
        }
    }

     /**
     * Updates an existing systems.
     * @param {Object} system - The systems object to update.
     * @returns {Promise<Object>} A promise that resolves to the updated systems object.
     * @throws {Error} If an error occurs while updating the systems.
     */
    async updateSystems (system) {
        try {
            const {data} = await api.put(`/systems/${system.id}/`, system, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return data.results;
        } catch (error) {
            console.log("error in putSystem", error);
            throw error;
        }
    }

     /**
     * Deletes a system by its ID.
     * @param {number} id - The ID of the system to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted system object.
     * @throws {Error} If an error occurs while deleting the system.
     */
    async deleteSystems (id) {
        try {
            const {data} = await api.delete(`/systems/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return data.results;
        } catch (error) {
            console.log("error in deleteSystem", error);
            throw error;
        }
    }
}

export default new SystemService();