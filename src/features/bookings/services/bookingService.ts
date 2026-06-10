import axios from 'axios';

const API_URL = '/api/bookings';

export interface Booking {
  id: string;
  serviceId: string;
  travellerId: string;
  partnerId: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled';
  totalAmount: number;
  escrowAmount: number;
  commissionAmount: number;
  bookingDate: string;
  createdAt: string;
}

export const bookingService = {
  async create(serviceId: string, bookingDate: string, additionalDetails?: any): Promise<Booking> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.post(API_URL, { serviceId, bookingDate, additionalDetails }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getPartnerBookings(): Promise<Booking[]> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    const response = await axios.get(`${API_URL}/partner`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updateStatus(id: string, status: string): Promise<void> {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {}
    await axios.patch(`${API_URL}/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
