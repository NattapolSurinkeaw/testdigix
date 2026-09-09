import api from './api';

export const categoryService = {
  getAll: async () => {
    const res = await api.get('/category');
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/category/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/category', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/category/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/category/${id}`);
    return res.data;
  },
};
