import api from "@/plugins/api";

const token = localStorage.getItem('psg_auth_token')

class UploaderService {
  async createUpload(url, newUpload) {
    try {
      // newUpload deve ser FormData
      const { data } = await api.post(`/${url}/`, newUpload, {
        headers: {
          'Authorization': `Bearer ${token}`
          // NÃO definir Content-Type, o Axios faz sozinho
        }
      });
      return data;
    } catch (error) {
      console.error('error in createUpload', error);
      throw error;
    }
  }

  async getUploads(url) {
    try {
      const { data } = await api.get(`/${url}/?page_size=0`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      console.error('error in getUploads', error);
      throw error;
    }
  }

  async getAllUploads(url) {
    return this.getUploads(url);
  }

  async updateUploads(url, upload) {
    try {
      const { data } = await api.put(`/${url}/${upload.id}/`, upload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      console.error('error in updateUploads', error);
      throw error;
    }
  }

  async deleteUpload(url, id) {
    try {
      const { data } = await api.delete(`/${url}/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      console.error('error in deleteUpload', error);
      throw error;
    }
  }
}

export default new UploaderService();
