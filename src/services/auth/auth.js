import axios from 'axios';

export default class AuthService {
  async getUser(token) {
    const response = await axios.get('http://localhost:8000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

