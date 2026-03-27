import { useEffect, useState } from 'react';
import transactionService from '../services/transactionService';
import type { Transaction } from '../services/transactionService';

export const useTransactionHistory = () => { // hook para buscar o histórico de transações
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const data = await transactionService.getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleDelete = async (id: number) => { // deleta uma transação
        if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
            try {
                await transactionService.deleteTransaction(id);
                setTransactions(transactions.filter((t: Transaction) => t.id !== id));
            } catch (error) {
                alert('Erro ao excluir transação');
            }
        }
    };

    return {
        transactions,
        loading,
        handleDelete,
        refresh: fetchTransactions
    };
};
