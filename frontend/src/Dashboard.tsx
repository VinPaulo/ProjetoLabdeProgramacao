import React from 'react';
import { LogOut, Layout, User as UserIcon } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="glass" style={{
      padding: '3rem',
      borderRadius: '1.5rem',
      width: '100%',
      maxWidth: '600px',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#334155',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid #3b82f6'
        }}>
          <UserIcon size={40} color="#3b82f6" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Olá, {user.name}!
        </h1>
        <p style={{ color: '#94a3b8' }}>
          Você está autenticado no Sistema LabProg.
        </p>
      </div>

      <div style={{
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        padding: '1.5rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
        textAlign: 'left',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1' }}>
          <Layout size={18} />
          <span style={{ fontWeight: 500 }}>Dashboard Inicial</span>
        </div>
        <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
            Esta é a sua área restrita. No futuro, você poderá visualizar seus relatórios e configurações aqui.
        </div>
      </div>

      <button
        onClick={onLogout}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: '#f87171',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)')}
      >
        <LogOut size={18} />
        Sair do Sistema
      </button>
    </div>
  );
};

export default Dashboard;
