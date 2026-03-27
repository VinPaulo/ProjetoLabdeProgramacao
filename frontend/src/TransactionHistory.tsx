import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import type { Transaction } from './services/transactionService';
import { useTransactionHistory } from './hooks/useTransactionHistory';

interface TransactionHistoryProps {
  onBack: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onBack }) => {
  const { transactions, loading, handleDelete } = useTransactionHistory();

  return (
    <div className="glass" style={{
      padding: '2.5rem',
      borderRadius: '1.5rem',
      width: '100%',
      maxWidth: '800px',
    }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={onBack} title="Voltar" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Extrato</h1>
      </header>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          {transactions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Nenhuma transação encontrada.</p>
          ) : (
            transactions.map((t: Transaction) => (
              <div key={t.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem',
                borderRadius: '1rem',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{t.description}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {t.category} • {new Date(t.date).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: t.type === 'INCOME' ? '#4ade80' : '#f87171' }}>
                    {t.type === 'INCOME' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                  </div>
                  <button 
                    onClick={() => t.id && handleDelete(t.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#f87171'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
