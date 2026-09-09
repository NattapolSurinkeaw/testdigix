import api from './api';

export const userService = {
  getAll: async () => {
    const res = await api.get('/users');
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/user', data);
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/user/${id}`);
    return res.data;
  },
};
