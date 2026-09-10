import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
});

const PUBLIC_AUTH_ENDPOINTS = ['/login', '/register'];

api.interceptors.request.use((config) => {
  const isPublicAuthEndpoint = PUBLIC_AUTH_ENDPOINTS.some((path) =>
    config.url?.endsWith(path)
  );

  if (!isPublicAuthEndpoint && !authService.validateSession()) {
    return Promise.reject(new Error('Token invalid or expired'));
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      authService.clearAndRedirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default api;
