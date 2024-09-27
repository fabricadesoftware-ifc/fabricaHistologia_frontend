import api from "@/plugins/api";

/**
 * Service class for handling Material related operations.
 */

class SupportingMaterialService {
     /**
   * Retrieves all Material.
   * @returns {Promise<Array>} A promise that resolves to an array of Material.
   * @throws {Error} If an error occurs while retrieving the Material.
   */
  async getMaterials() {
    try {
      const { data } = await api.get(`/supporting-material/`)
      return data.results
    } catch (error) {
      console.log('error in getMaterial', error)
      throw error
    }
  }

  /**
   * Retrieves all Material.
   * @returns {Promise<Array>} A promise that resolves to an array of Material filtered by systems.
   * @throws {Error} If an error occurs while retrieving the Material.
   */
    async getMaterialsBySystem(systemId) {
      try {
        const { data } = await api.get(`/supporting-material/?system_id=${systemId}`)
        return data.results
      } catch (error) {
        console.log('error in getMaterial', error)
        throw error
      }
    }

    async SearchMaterialsByName(name) {

      try {
      const {data} = await api.get(`/supporting-material/?search=${name}`)
      return data.results
      } catch (error) {
        throw error;
      }
    }
  /**
   * Creates a new Material.
   * @param {Object} newSpecie - The new Material object to create.
   * @returns {Promise<Object>} A promise that resolves to the created Material object.
   * @throws {Error} If an error occurs while creating the Material.
   */
  async createMaterial(newOrgan) {
    try {
      const { data } = await api.post(`/supporting-material/`, newOrgan)
      return data.results
    } catch (error) {
      console.log('error in createMaterial', error)
      throw error
    }
  }

  /**
   * Updates an existing Material.
   * @param {Object} specie - The Material object to update.
   * @returns {Promise<Object>} A promise that resolves to the updated Material object.
   * @throws {Error} If an error occurs while updating the Material.
   */
  async updateMaterials(organ) {
    try {
      const { data } = await api.put(`/supporting-material/${organ.id}/`)
      return data.results
    } catch (error) {
      console.log('error in updateMaterial')
      throw error
    }
  }

  /**
   * Deletes a Material by its ID.
   * @param {number} id - The ID of the Material to delete.
   * @returns {Promise<Object>} A promise that resolves to the deleted Material object.
   * @throws {Error} If an error occurs while deleting the Material.
   */
  async deleteMaterials(id) {
    try {
      const { data } = await api.delete(`/supporting-material/${id}/`)
      return data.results
    } catch (error) {
      console.log('error in deleteMaterial', error)
      throw error
    }
  }
}

export default new SupportingMaterialService()