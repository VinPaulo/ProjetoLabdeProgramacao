import { useEffect, useState, useMemo } from 'react';
import transactionService from '../services/transactionService';
import type { Transaction } from '../services/transactionService';

export type TimeRange = 'semanal' | 'mensal';

export const useWalletDashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<TimeRange>('semanal');

    const fetchTransactions = async () => {
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

    const totalIncome = useMemo(() => 
        transactions
            .filter((t: Transaction) => t.type === 'INCOME')
            .reduce((acc: number, curr: Transaction) => acc + curr.amount, 0),
    [transactions]);

    const totalExpense = useMemo(() => 
        transactions
            .filter((t: Transaction) => t.type === 'EXPENSE')
            .reduce((acc: number, curr: Transaction) => acc + curr.amount, 0),
    [transactions]);

    const balance = totalIncome - totalExpense;

    // Cálculo dinâmico para o gráfico de barras
    const chartData = useMemo(() => {
        const expensesOnly = transactions.filter(t => t.type === 'EXPENSE');
        
        if (expensesOnly.length === 0) return [];

        if (timeRange === 'semanal') {
            const categories = [...new Set(expensesOnly.map(t => t.category))].slice(0, 6);
            return categories.map((cat) => {
                const total = expensesOnly.filter(t => t.category === cat).reduce((acc, curr) => acc + curr.amount, 0);
                const percent = totalExpense > 0 ? ((total / totalExpense) * 100).toFixed(1) : '0.0';
                return {
                    label: cat,
                    height: `${Math.max(15, parseFloat(percent))}%`,
                    value: `${percent}%`
                };
            });
        } else {
            // Agrupamento Mensal Real
            const monthlyGroups: Record<string, { total: number, sortKey: number }> = {};
            const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

            expensesOnly.forEach(t => {
                const d = new Date(t.date);
                const monthYear = `${monthNames[d.getMonth()]}/${d.getFullYear().toString().slice(-2)}`;
                const sortKey = d.getFullYear() * 100 + d.getMonth();

                if (!monthlyGroups[monthYear]) {
                    monthlyGroups[monthYear] = { total: 0, sortKey };
                }
                monthlyGroups[monthYear].total += t.amount;
            });

            const sortedEntries = Object.entries(monthlyGroups)
                .sort((a, b) => a[1].sortKey - b[1].sortKey)
                .slice(-6);

            const maxMonthTotal = Math.max(...sortedEntries.map(([, data]) => data.total), 1);

            return sortedEntries.map(([label, data]) => {
                const percent = totalExpense > 0 ? ((data.total / totalExpense) * 100).toFixed(1) : '0.0';
                const barHeight = ((data.total / maxMonthTotal) * 100).toFixed(0);
                
                return {
                    label,
                    height: `${Math.max(15, parseFloat(barHeight))}%`,
                    value: `${percent}%`
                };
            });
        }
    }, [transactions, timeRange, totalExpense]);

    return {
        transactions,
        loading,
        totalIncome,
        totalExpense,
        balance,
        recentTransactions: transactions.slice(0, 5),
        chartData,
        timeRange,
        setTimeRange
    };
};
