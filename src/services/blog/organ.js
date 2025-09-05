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

    async getOrgansBySearch(search) {
    try {
      const { data } = await api.get(`/organs/?name=${search}`)
      console.log(data)
      return data.results
    } catch (error) {
      console.log('error in getOrgansBySearch', error)
      throw error
    }
  }


  async getAllOrgans() {
    try {
      const { data } = await api.get(`/organs/?page_size=0`)
      return data
    } catch (error) {
      console.log('error in getAllOrgans', error)
      throw error
    }
  }

  async getOrgansBySystem(systemId, page = '') {
    try {
      const { data } = await api.get(`/organs/?page=1&system_id=${systemId}&page=${page}`)
      return data.results
    } catch (error) {
      console.log('error in getOrgansBySystem', error)
      throw error
    }
  }

  async getAllOrgansBySystem(systemId) {
    try {
      const { data } = await api.get(`/organs/?page=1&system_id=${systemId}&page_size=0`)
      return data
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
