import api from "@/plugins/api";

const token = localStorage.getItem('psg_auth_token')

/**
 * Service class for handling Uploads related operations.
 */

/**
 * This service is for both documents and images, due to it, there is a param being cloned in all functions of this class, called 'url', if the user wants to add an image the value of the param must be '/images/' and if he wants to add an document, the param must be equal '/documents/'.
 */

class UploaderService {
     /**
   * Retrieves all Uploads.
   * @returns {Promise<Array>} A promise that resolves to an array of Uploads.
   * @throws {Error} If an error occurs while retrieving the Uploads.
   */
  async getUploads(url) {
    try {
      const { data } = await api.get(`/${url}`)
      console.log('upload response:', data);
      return data
    } catch (error) {
      console.log('error in getUploads', error)
      throw error
    }
  }


  /**
   * Creates a new organs.
   * @param {Object} newSpecie - The new organs object to create.
   * @returns {Promise<Object>} A promise that resolves to the created organs object.
   * @throws {Error} If an error occurs while creating the organs.
   */
  async createUpload(url, newUpload) {
    try {
      const { data } = await api.post(`/${url}/`, newUpload, {headers: {'authorization': `Bearer ${token}`,  "Content-Type": 'multipart/form-data'}})
      return data
    } catch (error) {
      console.log('error in createUpload', error)
      throw error
    }
  }


  /**
   * Updates an existing organs.
   * @param {Object} specie - The organs object to update.
   * @returns {Promise<Object>} A promise that resolves to the updated organs object.
   * @throws {Error} If an error occurs while updating the organs.
   */
  async updateUploads(url, upload) {
    try {
      const { data } = await api.put(`/${url}/${upload.id}/`)
      return data.results
    } catch (error) {
      console.log('error in updateUploads')
      throw error
    }
  }

  /**
   * Deletes a organs by its ID.
   * @param {number} id - The ID of the organs to delete.
   * @returns {Promise<Object>} A promise that resolves to the deleted organs object.
   * @throws {Error} If an error occurs while deleting the organs.
   */
  async deleteUpload(url, id) {
    try {
      const { data } = await api.delete(`/${url}/${id}/`)
      return data.results
    } catch (error) {
      console.log('error in deleteUpload', error)
      throw error
    }
  }
}

export default new UploaderService()