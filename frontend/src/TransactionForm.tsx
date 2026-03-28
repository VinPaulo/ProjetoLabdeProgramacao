import React from 'react';
import { ArrowLeft, PlusCircle, Calendar, Tag, DollarSign, Wallet, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
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

    const labelStyle: React.CSSProperties = {
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };

    return (
        <div className="glass animate-fade-in" style={{
            padding: '3rem',
            borderRadius: '2rem',
            width: '100%',
            maxWidth: '520px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Accent Glow */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '150px',
                height: '150px',
                background: type === 'EXPENSE' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                filter: 'blur(50px)',
                borderRadius: '50%',
                zIndex: 0,
                transition: 'background 0.5s ease'
            }} />

            <header style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
                <button 
                    onClick={onBack} 
                    style={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid var(--border-subtle)', 
                        color: 'var(--text-main)', 
                        cursor: 'pointer',
                        padding: '0.6rem',
                        borderRadius: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Nova Transação</h1>
            </header>

            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
                {/* Segmented Control Toggle */}
                <div style={{ 
                    display: 'flex', 
                    position: 'relative',
                    marginBottom: '2.5rem', 
                    backgroundColor: 'rgba(0,0,0,0.2)', 
                    padding: '4px', 
                    borderRadius: '1rem',
                    border: '1px solid var(--border-subtle)'
                }}>
                    <div style={{
                        position: 'absolute',
                        left: type === 'EXPENSE' ? '4px' : '50%',
                        top: '4px',
                        width: 'calc(50% - 4px)',
                        height: 'calc(100% - 8px)',
                        backgroundColor: type === 'EXPENSE' ? '#ef4444' : '#22c55e',
                        borderRadius: '0.8rem',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: `0 4px 12px ${type === 'EXPENSE' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                        zIndex: 0
                    }} />
                    
                    <button
                        type="button"
                        onClick={() => setType('EXPENSE')}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '0.8rem',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            zIndex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            transition: 'color 0.3s'
                        }}
                    >
                        <ArrowDownCircle size={18} opacity={type === 'EXPENSE' ? 1 : 0.6} />
                        Gasto
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('INCOME')}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '0.8rem',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            zIndex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            transition: 'color 0.3s'
                        }}
                    >
                        <ArrowUpCircle size={18} opacity={type === 'INCOME' ? 1 : 0.6} />
                        Ganho
                    </button>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="description" style={labelStyle}>
                        <PlusCircle size={14} color="#60a5fa" /> Descrição
                    </label>
                    <input
                        id="description"
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Aluguel, Supermercado..."
                        className="input-field"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="amount" style={labelStyle}>
                        <DollarSign size={14} color="#facc15" /> Valor (R$)
                    </label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="input-field"
                        style={{ fontSize: '1.25rem', fontWeight: 700 }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    <div>
                        <label htmlFor="date" style={labelStyle}>
                            <Calendar size={14} color="#a855f7" /> Data
                        </label>
                        <input
                            id="date"
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" style={labelStyle}>
                            <Tag size={14} color="#f472b6" /> Categoria
                        </label>
                        <div style={{ position: 'relative' }}>
                            <select
                                id="category"
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
                            <div style={{ 
                                position: 'absolute', 
                                right: '1rem', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                pointerEvents: 'none',
                                color: 'var(--text-muted)'
                            }}>
                                <ArrowDownCircle size={14} />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.75rem',
                        height: '3.5rem'
                    }}
                >
                    {loading ? (
                        <>Carregando...</>
                    ) : (
                        <>
                            <Wallet size={20} />
                            Confirmar Transação
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
