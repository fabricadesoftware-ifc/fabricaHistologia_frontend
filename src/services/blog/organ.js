import api from '../../plugins/api'
const token = localStorage.getItem('psg_auth_token')

/**
 * Service class for handling organs related operations.
 */
class OrganService {
  async getOrgans(page = "") {
    try {
      const { data } = await api.get(`/organs/?page=${page}`)
      return data
    } catch (error) {
      console.log('error in getOrgans', error)
      throw error
    }
  }

  async getOrgansBySystem(systemId) {
    try {
      const { data } = await api.get(`/organs/?page=1&system_id=${systemId}`)
      return data.results
    } catch (error) {
      console.log('error in getOrgansBySystem', error)
      throw error
    }
  }

  async getOrgansById(organ_id) {
    try {
      const { data } = await api.get(`/organs/${organ_id}/`)
      return data
    } catch (error) {
      console.log('error in getOrgansById', error)
      throw error
    }
  }

  async createOrgan(newOrgan) {
    try {
      const { data } = await api.post(`/organs/`, newOrgan, {
        headers: { authorization: `Bearer ${token}` }
      })
      return data.results
    } catch (error) {
      console.log('error in createOrgan', error)
      throw error
    }
  }

  async updateOrgans(organ) {
    try {
      console.log('chegou longe')
      const { data } = await api.put(`/organs/${organ.id}/`, organ, {
        headers: { authorization: `Bearer ${token}` }
      })
      return data.results
    } catch (error) {
      console.log('error in updateOrgans', error)
      throw error
    }
  }

  async deleteOrgans(id) {
    try {
      const { data } = await api.delete(`/organs/${id}/`, {
        headers: { authorization: `Bearer ${token}` }
      })
      return data.results
    } catch (error) {
      console.log('error in deleteOrgan', error)
      throw error
    }
  }
}

export default new OrganService()
