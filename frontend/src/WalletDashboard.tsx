import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Plus, List as ListIcon } from 'lucide-react';
import type { Transaction } from './services/transactionService';
import { useWalletDashboard } from './hooks/useWalletDashboard';

interface WalletDashboardProps {
  user: any;
  onNavigate: (view: 'dashboard' | 'history' | 'add') => void;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ user, onNavigate }) => {
  const { 
    loading, 
    totalIncome, 
    totalExpense, 
    balance, 
    recentTransactions 
  } = useWalletDashboard();

  const cardStyle: React.CSSProperties = {
    padding: '1.5rem',
    borderRadius: '1.25rem',
    flex: 1,
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: '1px solid var(--border-subtle)',
    backgroundColor: 'var(--input-bg)',
  };

  return (
    <div className="glass" style={{
      padding: '2.5rem',
      borderRadius: '1.5rem',
      width: '100%',
      maxWidth: '800px',
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>p.wallet</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Bem-vindo de volta, {user.name || user.username}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onNavigate('history')} title="Ver Histórico" style={{ background: 'none', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}>
             <ListIcon size={20} />
          </button>
          <button onClick={() => onNavigate('add')} title="Adicionar Transação" style={{ backgroundColor: 'var(--accent)', border: 'none', color: 'var(--bg-main)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}>
             <Plus size={20} />
          </button>
        </div>
      </header>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ ...cardStyle, borderLeft: '4px solid #4ade80' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80' }}>
                <ArrowUpCircle size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Entradas</span>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>R$ {totalIncome.toFixed(2)}</span>
            </div>

            <div style={{ ...cardStyle, borderLeft: '4px solid #f87171' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171' }}>
                <ArrowDownCircle size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Saídas</span>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>R$ {totalExpense.toFixed(2)}</span>
            </div>

            <div style={{ ...cardStyle, backgroundColor: 'var(--accent)', color: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wallet size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Saldo Total</span>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>R$ {balance.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Atividade Recente</h3>
            {recentTransactions.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>Nenhuma transação registrada.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recentTransactions.map((t: Transaction) => (
                  <div key={t.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.description}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.category} • {new Date(t.date).toLocaleDateString()}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: t.type === 'INCOME' ? '#4ade80' : '#f87171' }}>
                      {t.type === 'INCOME' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WalletDashboard;
