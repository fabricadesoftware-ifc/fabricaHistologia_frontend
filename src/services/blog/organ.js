import api from '../../plugins/api'
const token = localStorage.getItem('psg_auth_token')
/**
 * Service class for handling organs related operations.
 */
class OrganService {
  /**
   * Retrieves all organs.
   * @returns {Promise<Array>} A promise that resolves to an array of organs.
   * @throws {Error} If an error occurs while retrieving the organs.
   */
  async getOrgans() {
    try {
      console.log('get')
        const { data } = await api.get(`/organs`)
        return data.results
    } catch (error) {
        console.log('error in getOrgans', error)
        throw error
    }
  }

  /**
   * Creates a new organs.
   * @param {Object} newSpecie - The new organs object to create.
   * @returns {Promise<Object>} A promise that resolves to the created organs object.
   * @throws {Error} If an error occurs while creating the organs.
   */
  async createOrgan(newOrgan) {
      const { data } = await api.post(`/organs/`, newOrgan, {headers: {authorization: `Bearer ${token}`}})
      console.log(token)
      return data.results
  }

  /**
   * Updates an existing organs.
   * @param {Object} specie - The organs object to update.
   * @returns {Promise<Object>} A promise that resolves to the updated organs object.
   * @throws {Error} If an error occurs while updating the organs.
   */
  async updateOrgans(organ) {
    try {
      console.log(organ)
      const { data } = await api.put(`/organs/${organ.id}/`, organ, {headers: {'authorization': `Bearer ${token}`}})
      return data.results
    } catch (error) {
      console.log('error in updateOrgans', error)
      throw error
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
      const { data } = await api.delete(`/organs/${id}/`, {headers: {'authorization': `Bearer ${token}`}})
      return data.results
    } catch (error) {
      console.log('error in deleteOrgan', error)
      throw error
    }
  }
}

export default new OrganService()
