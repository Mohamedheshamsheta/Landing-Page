import axios from 'axios';

const API_URL = '/api/applications';

export interface PartnerApplication {
  id: string;
  userId: string;
  businessName: string;
  businessDescription: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  updatedAt: string;
}

export const applicationService = {
  async apply(businessName: string, businessDescription: string): Promise<PartnerApplication> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.post(`${API_URL}/apply`, { businessName, businessDescription }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getMyApplication(): Promise<PartnerApplication | null> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.get(`${API_URL}/my-application`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getAll(): Promise<PartnerApplication[]> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.get(`${API_URL}/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async approve(id: string): Promise<void> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    await axios.post(`${API_URL}/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async reject(id: string): Promise<void> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    await axios.post(`${API_URL}/${id}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
