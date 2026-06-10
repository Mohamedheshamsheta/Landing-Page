import axios from 'axios';

const API_URL = '/api/auth';

export interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  async register(fullName: string, email: string, password: string, role: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/register`, { fullName, email, password, role });
    return response.data;
  },

  async me(): Promise<AuthResponse['user']> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
