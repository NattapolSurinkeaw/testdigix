import api from './api';

const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

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

  isTokenValid: () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    const payload = decodeToken(token);
    if (!payload || !payload.exp) return false;

    return payload.exp * 1000 > Date.now();
  },

  clearAndRedirectToLogin: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    if (!window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
    }
  },

  validateSession: () => {
    if (localStorage.getItem('accessToken') && !authService.isTokenValid()) {
      authService.clearAndRedirectToLogin();
      return false;
    }
    return !!authService.isTokenValid();
  },
};
