import React from 'react';
import { ArrowLeft, PlusCircle, Calendar, Tag, DollarSign } from 'lucide-react';
import { useTransactionForm } from './hooks/useTransactionForm';

interface TransactionFormProps {
    onBack: () => void;
    onSuccess: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onBack, onSuccess }) => {
    const {
        description, setDescription,
        amount, setAmount,
        date, setDate,
        type, setType,
        category, setCategory,
        loading,
        handleSubmit
    } = useTransactionForm({ onSuccess });

    const inputContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        textAlign: 'left',
        marginBottom: '1.25rem'
    };

    const labelStyle: React.CSSProperties = {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    return (
        <div className="glass" style={{
            padding: '2.5rem',
            borderRadius: '1.5rem',
            width: '100%',
            maxWidth: '500px',
        }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={onBack} title="Voltar" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Nova Transação</h1>
            </header>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '0.75rem' }}>
                    <button
                        type="button"
                        onClick={() => setType('EXPENSE')}
                        style={{
                            flex: 1,
                            padding: '0.6rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            backgroundColor: type === 'EXPENSE' ? '#f87171' : 'transparent',
                            color: type === 'EXPENSE' ? 'white' : 'var(--text-muted)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Gasto
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('INCOME')}
                        style={{
                            flex: 1,
                            padding: '0.6rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            backgroundColor: type === 'INCOME' ? '#4ade80' : 'transparent',
                            color: type === 'INCOME' ? 'white' : 'var(--text-muted)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Ganho
                    </button>
                </div>

                <div style={inputContainerStyle}>
                    <label style={labelStyle}><PlusCircle size={16} /> Descrição</label>
                    <input
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Aluguel, Supermercado..."
                        className="input-field"
                    />
                </div>

                <div style={inputContainerStyle}>
                    <label style={labelStyle}><DollarSign size={16} /> Valor (R$)</label>
                    <input
                        type="number"
                        step="0.01"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="input-field"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}><Calendar size={16} /> Data</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}><Tag size={16} /> Categoria</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="input-field"
                            style={{ appearance: 'none' }}
                        >
                            <option value="Alimentação">Alimentação</option>
                            <option value="Lazer">Lazer</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Educação">Educação</option>
                            <option value="Moradia">Moradia</option>
                            <option value="Salário">Salário</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
                >
                    {loading ? 'Salvando...' : 'Confirmar Transação'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
