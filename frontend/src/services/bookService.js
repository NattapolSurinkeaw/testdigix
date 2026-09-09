import api from './api';

export const bookService = {
  getAll: async (params = {}) => {
    const res = await api.get('/books', { params });
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/book/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/book', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.post(`/book/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/book/${id}`);
    return res.data;
  },
};
