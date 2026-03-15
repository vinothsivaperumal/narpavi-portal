import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
};

export const lessonsApi = {
  getAll: (batchId?: string) =>
    api.get('/lessons', { params: batchId ? { batchId } : {} }),
  getOne: (id: string) => api.get(`/lessons/${id}`),
};

export const ipApi = {
  getMyRequests: () => api.get('/ip/my-requests'),
  createRequest: (ipAddress: string, description?: string) =>
    api.post('/ip/request', { ipAddress, description }),
  getAll: () => api.get('/ip'),
  approve: (id: string, reviewNotes?: string) =>
    api.patch(`/ip/${id}/approve`, { reviewNotes }),
  reject: (id: string, reviewNotes?: string) =>
    api.patch(`/ip/${id}/reject`, { reviewNotes }),
};

export const paymentsApi = {
  getMyPayments: () => api.get('/payments/my-payments'),
  createPayment: (amount: number, description: string, batchId?: string) =>
    api.post('/payments', { amount, description, batchId }),
  getAll: () => api.get('/payments'),
};

export const messagingApi = {
  getInbox: () => api.get('/messages/inbox'),
  getConversation: (userId: string) => api.get(`/messages/conversation/${userId}`),
  send: (recipientId: string, content: string) =>
    api.post('/messages/send', { recipientId, content }),
};

export default api;
