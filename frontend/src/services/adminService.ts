import api from './api';

export interface AdminStats {
  totalUsers: number;
  totalTransactions: number;
}

export interface UserAdminInfo {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

const getStats = async (): Promise<AdminStats> => {
  const response = await api.get('/admin/stats');
  return response.data;
};

const getUsers = async (): Promise<UserAdminInfo[]> => {
  const response = await api.get('/admin/users');
  return response.data;
};

const promoteUser = async (id: number): Promise<void> => {
  await api.put(`/admin/promote/${id}`);
};

const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/admin/users/${id}`);
};

export default {
  getStats,
  getUsers,
  promoteUser,
  deleteUser,
};
