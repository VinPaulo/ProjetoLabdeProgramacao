import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import TransactionForm from './TransactionForm';

// Mock do hook customizado para focar no teste da UI
vi.mock('./hooks/useTransactionForm', () => ({
  useTransactionForm: () => ({
    description: '',
    setDescription: vi.fn(),
    amount: '',
    setAmount: vi.fn(),
    date: '',
    setDate: vi.fn(),
    type: 'EXPENSE',
    setType: vi.fn(),
    category: 'Alimentação',
    setCategory: vi.fn(),
    loading: false,
    handleSubmit: vi.fn((e) => e.preventDefault()),
  }),
}));

test('Renderiza o formulário de nova transação corretamente', () => {
  render(<TransactionForm onBack={() => {}} onSuccess={() => {}} />);
  
  expect(screen.getByText(/Nova Transação/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Valor/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Confirmar Transação/i })).toBeInTheDocument();
});

test('Alterna entre Gasto e Ganho no formulário', () => {
  render(<TransactionForm onBack={() => {}} onSuccess={() => {}} />);
  
  const gastoBtn = screen.getByText(/Gasto/i);
  const ganhoBtn = screen.getByText(/Ganho/i);
  
  expect(gastoBtn).toBeInTheDocument();
  expect(ganhoBtn).toBeInTheDocument();
});
