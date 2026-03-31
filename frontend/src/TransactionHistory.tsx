import React from 'react';
import { ArrowLeft, Trash2, Calendar, Tag, History } from 'lucide-react';
import type { Transaction } from './services/transactionService';
import { useTransactionHistory } from './hooks/useTransactionHistory';

interface TransactionHistoryProps {
  onBack: () => void;
}

interface FormattedTransaction extends Transaction {
    formattedDate: string;
    formattedAmount: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onBack }) => {
  const { transactions, loading, handleDelete } = useTransactionHistory();

  // Lógica de formatação separada da renderização
  const formattedTransactions: FormattedTransaction[] = transactions.map(t => ({
    ...t,
    formattedDate: new Date(t.date).toLocaleDateString(),
    formattedAmount: `R$ ${t.amount.toLocaleString()}`
  }));

  if (loading) return <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Carregando histórico...</div>;

  return (
    <div className="glass animate-fade-in" style={{ padding: '2rem', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onBack} title="Voltar" style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-main)', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Histórico de Lançamentos</h1>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total de {transactions.length} registros</div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {formattedTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
             <History size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.3 }} />
             <p>Nenhuma transação encontrada no seu histórico.</p>
          </div>
        ) : (
          formattedTransactions.map((t, index) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.5rem', borderRadius: '1.25rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', animationDelay: `${index * 0.05}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: t.type === 'INCOME' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.type === 'INCOME' ? '#4ade80' : '#f87171' }}>
                  <Tag size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>{t.description}</div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Tag size={12} /> {t.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={12} /> {t.formattedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: t.type === 'INCOME' ? '#4ade80' : '#f87171', textAlign: 'right', minWidth: '100px' }}>
                  {t.type === 'INCOME' ? '+' : '-'} {t.formattedAmount}
                </div>
                <button onClick={() => t.id && handleDelete(t.id)} title="Excluir" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.2s', padding: '0.5rem', borderRadius: '8px' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
