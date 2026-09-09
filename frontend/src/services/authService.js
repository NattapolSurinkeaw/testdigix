import api from './api';

export const authService = {
  login: async (username, password) => {
    const res = await api.post('/login', { username, password });
    if (res.data.status && res.data.token) {
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  register: async (data) => {
    const res = await api.post('/register', data);
    if (res.data.status && res.data.token) {
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn: () => !!localStorage.getItem('accessToken'),
};
