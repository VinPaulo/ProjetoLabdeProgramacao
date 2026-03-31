import React from 'react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet, 
  Plus, 
  TrendingUp, 
  Activity,
  History
} from 'lucide-react';
import { useWalletDashboard } from './hooks/useWalletDashboard';

interface WalletDashboardProps {
  onNavigate: (view: 'dashboard' | 'history' | 'add' | 'settings') => void;
}

const ChartBar = ({ height, label, value }: { height: string, label: string, value: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
    <div style={{ 
      width: '100%', 
      height: '200px', 
      backgroundColor: 'rgba(255,255,255,0.02)', 
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      <div style={{ 
        width: '32px', 
        height: height, 
        backgroundColor: '#4ade80', 
        borderRadius: '8px',
        opacity: 0.8,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 0 20px rgba(74, 222, 128, 0.1)'
      }}>
         <div style={{ 
           fontSize: '0.65rem', 
           textAlign: 'center', 
           marginTop: '-1.4rem', 
           color: 'var(--text-muted)' 
         }}>
           {value}
         </div>
      </div>
    </div>
    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
      {label}
    </span>
  </div>
);

const WalletDashboard: React.FC<WalletDashboardProps> = ({ onNavigate }) => {
  const { 
    loading, 
    totalIncome, 
    totalExpense, 
    balance, 
    recentTransactions,
    chartData,
    timeRange,
    setTimeRange
  } = useWalletDashboard();

  const kpiCardStyle: React.CSSProperties = {
    padding: '1.8rem',
    borderRadius: '1.5rem',
    flex: 1,
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    position: 'relative',
    overflow: 'hidden'
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Carregando dados...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', boxSizing: 'border-box' }}>
      
      {/* KPI Row */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div className="glass" style={kpiCardStyle}>
           <div style={{ color: '#4ade80', display: 'flex', justifyContent: 'space-between' }}>
             <ArrowUpCircle size={24} />
             <TrendingUp size={20} style={{ opacity: 0.5 }} />
           </div>
           <div>
             <div style={{ fontSize: '2rem', fontWeight: 800 }}>R$ {totalIncome.toLocaleString()}</div>
             <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Entradas Totais</div>
           </div>
           <div style={{ position: 'absolute', right: '-15px', bottom: '-15px', opacity: 0.05 }}>
             <ArrowUpCircle size={100} />
           </div>
        </div>

        <div className="glass" style={kpiCardStyle}>
           <div style={{ color: '#f87171', display: 'flex', justifyContent: 'space-between' }}>
             <ArrowDownCircle size={24} />
             <Activity size={20} style={{ opacity: 0.5 }} />
           </div>
           <div>
             <div style={{ fontSize: '2rem', fontWeight: 800 }}>R$ {totalExpense.toLocaleString()}</div>
             <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Saídas Totais</div>
           </div>
           <div style={{ position: 'absolute', right: '-15px', bottom: '-15px', opacity: 0.05 }}>
             <ArrowDownCircle size={100} />
           </div>
        </div>

        <div className="glass" style={{ ...kpiCardStyle, background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(153, 27, 27, 0.05) 100%)', border: '1px solid rgba(220, 38, 38, 0.3)', boxShadow: '0 8px 32px rgba(220, 38, 38, 0.1)', color: 'var(--text-main)' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
             <Wallet size={24} color="var(--accent)" />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--accent)', color: 'var(--accent)' }}>CONTA ATIVA</div>
           </div>
           <div>
             <div style={{ fontSize: '2rem', fontWeight: 900 }}>R$ {balance.toLocaleString()}</div>
             <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.2rem' }}>Saldo em Carteira</div>
           </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass" style={{ padding: '2rem', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Gasto por Período</h3>
            <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '10px' }}>
               {(['semanal', 'mensal'] as const).map((r) => (
                  <button 
                  key={r}
                  onClick={() => setTimeRange(r)}
                  style={{ 
                    background: timeRange === r ? 'var(--accent)' : 'transparent', 
                    border: 'none', 
                    color: timeRange === r ? 'var(--bg-main)' : 'var(--text-muted)', 
                    padding: '6px 14px', 
                    borderRadius: '8px', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize'
                  }}>{r}</button>
               ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', height: '240px', alignItems: 'flex-end', paddingBottom: '1rem', position: 'relative' }}>
             {chartData.length === 0 ? (
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontStyle: 'italic'
                }}>
                  Nenhum dado para este período
                </div>
             ) : (
                chartData.map((data, idx) => (
                   <ChartBar key={idx} height={data.height} label={data.label} value={data.value} />
                ))
             )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          <div className="glass" style={{ padding: '1.8rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Transações Recentes</h3>
              <Activity size={18} color="var(--text-muted)" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentTransactions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                   Sem movimentações recentes
                </div>
              ) : (
                recentTransactions.map((t) => (
                  <div key={t.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    padding: '0.8rem',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '10px', 
                      backgroundColor: t.type === 'INCOME' ? 'rgba(74, 222, 128, 0.08)' : 'rgba(248, 113, 113, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: t.type === 'INCOME' ? '#4ade80' : '#f87171'
                    }}>
                      {t.type === 'INCOME' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.description}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.category}</div>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: t.type === 'INCOME' ? '#4ade80' : '#f87171' }}>
                      {t.type === 'INCOME' ? '+' : '-'} R$ {t.amount}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <button 
              onClick={() => onNavigate('history')}
              style={{ 
                width: '100%', 
                marginTop: '1.5rem', 
                padding: '0.9rem', 
                borderRadius: '12px', 
                border: '1px solid var(--border-subtle)',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                transition: 'all 0.2s'
              }}
            >
              <History size={16} />
              Acessar Extrato Completo
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="glass" style={{ padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Gestão Rápida</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Registre novas entradas ou saídas em segundos.</span>
         </div>
         <button 
           onClick={() => onNavigate('add')}
           style={{ 
             padding: '1rem 2rem', 
             borderRadius: '14px', 
             border: 'none', 
             backgroundColor: 'var(--accent)', 
             color: 'var(--bg-main)', 
             fontWeight: 800, 
             fontSize: '0.95rem',
             cursor: 'pointer',
             display: 'flex',
             alignItems: 'center',
             gap: '0.8rem',
             boxShadow: '0 10px 20px rgba(255, 255, 255, 0.05)',
             transition: 'transform 0.2s'
           }}
           onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
           onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
         >
           <Plus size={20} strokeWidth={3} />
           Nova Movimentação
         </button>
      </div>

    </div>
  );
};

export default WalletDashboard;
