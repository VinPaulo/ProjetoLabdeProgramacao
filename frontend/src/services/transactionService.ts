import api from './api';

export interface Transaction {
  id?: number;
  description: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
}

const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  return response.data;
};

const addTransaction = async (transaction: Transaction): Promise<Transaction> => {
  const response = await api.post('/transactions', transaction);
  return response.data;
};

const deleteTransaction = async (id: number): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};

export default {
  getTransactions,
  addTransaction,
  deleteTransaction,
};
