import axios from 'axios';

const API_URL = '/api/services';

export interface Service {
  id: string;
  partnerId: string;
  categoryId: string;
  category: string;
  title: string;
  description: string;
  basePrice: number;
  location: string;
  availability: string;
  isActive: boolean;
  createdAt: string;
}

export const serviceService = {
  async getAll(category?: string): Promise<Service[]> {
    const response = await axios.get(API_URL, { params: { category } });
    return response.data;
  },

  async create(serviceData: any): Promise<Service> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.post(API_URL, serviceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getMyServices(): Promise<Service[]> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.get(`${API_URL}/my-services`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async update(id: string, serviceData: any): Promise<Service> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.patch(`${API_URL}/${id}`, serviceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
