import axios from 'axios';

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

const API_URL = '/api/notifications';

export const notificationService = {
  getNotifications: async (userId: string): Promise<Notification[]> => {
    const response = await axios.get(API_URL, {
      headers: { 'x-user-id': userId }
    });
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await axios.post(`${API_URL}/${id}/read`);
  },

  markAllAsRead: async (userId: string): Promise<void> => {
    await axios.post(`${API_URL}/read-all`, {}, {
      headers: { 'x-user-id': userId }
    });
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  createTestNotification: async (userId: string, title?: string, message?: string): Promise<Notification> => {
    const response = await axios.post(`${API_URL}/test`, { title, message }, {
      headers: { 'x-user-id': userId }
    });
    return response.data;
  }
};
