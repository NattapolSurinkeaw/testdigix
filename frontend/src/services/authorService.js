import api from './api';

export const authorService = {
  getAll: async () => {
    const res = await api.get('/authors');
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/author/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/author', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.post(`/author/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/author/${id}`);
    return res.data;
  },
};
