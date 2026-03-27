import { useState } from 'react';
import transactionService from '../services/transactionService';

interface UseTransactionFormProps {
    onSuccess: () => void;
}

export const useTransactionForm = ({ onSuccess }: UseTransactionFormProps) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
    const [category, setCategory] = useState('Outros');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await transactionService.addTransaction({
                description,
                amount: parseFloat(amount),
                date,
                type,
                category
            });
            onSuccess();
        } catch (error) {
            console.error('Erro ao adicionar transação:', error);
            alert('Erro ao salvar transação');
        } finally {
            setLoading(false);
        }
    };

    return {
        description,setDescription,
        amount,setAmount,
        date,setDate,
        type,setType,
        category,setCategory,
        loading,
        handleSubmit
    };
};
