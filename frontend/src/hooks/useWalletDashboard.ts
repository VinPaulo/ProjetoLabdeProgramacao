import { useEffect, useState } from 'react';
import transactionService from '../services/transactionService';
import type { Transaction } from '../services/transactionService';

export const useWalletDashboard = () => { // hook para buscar as transações do usuário
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => { // busca as transações do usuário
        try {
            const data = await transactionService.getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const totalIncome = transactions
        .filter((t: Transaction) => t.type === 'INCOME') // soma as transações de receita
        .reduce((acc: number, curr: Transaction) => acc + curr.amount, 0);

    const totalExpense = transactions
        .filter((t: Transaction) => t.type === 'EXPENSE') // soma as transações de despesa
        .reduce((acc: number, curr: Transaction) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpense; // calcula o saldo

    return {
        transactions,
        loading,
        totalIncome,
        totalExpense,
        balance,
        recentTransactions: transactions.slice(0, 5)
    };
};
