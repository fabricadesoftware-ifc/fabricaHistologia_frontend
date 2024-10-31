import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export default class AuthService {
  async getUser(token) {
    const response = await axios.get(apiUrl + '/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

