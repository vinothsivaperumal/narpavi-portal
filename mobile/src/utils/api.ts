import axios from 'axios';
import { getToken } from './storage';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },

  getLessons: async (batchId?: string) => {
    const res = await api.get('/lessons', { params: batchId ? { batchId } : {} });
    return res.data;
  },

  getMyIpRequests: async () => {
    const res = await api.get('/ip/my-requests');
    return res.data;
  },

  submitIpRequest: async (ipAddress: string, description?: string) => {
    const res = await api.post('/ip/request', { ipAddress, description });
    return res.data;
  },

  getMyPayments: async () => {
    const res = await api.get('/payments/my-payments');
    return res.data;
  },

  getInbox: async () => {
    const res = await api.get('/messages/inbox');
    return res.data;
  },

  sendMessage: async (recipientId: string, content: string) => {
    const res = await api.post('/messages/send', { recipientId, content });
    return res.data;
  },
};

export default api;
