import api from './api';

const AUTH_URL = '/auth';

const login = async (email: string, password: String) => {
  const response = await api.post(`${AUTH_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (name: string, email: string, password: String) => {
  return await api.post(`${AUTH_URL}/register`, { name, email, password });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || 'null');
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
};
