import React, { useState } from 'react';
import { LogOut, ShieldCheck } from 'lucide-react';
import WalletDashboard from './WalletDashboard';
import TransactionHistory from './TransactionHistory';
import TransactionForm from './TransactionForm';

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onAdminClick: () => void;
}

type WalletView = 'dashboard' | 'history' | 'add';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onAdminClick }) => {
  const [view, setView] = useState<WalletView>('dashboard');
  const isAdmin = user.roles && user.roles.includes('ROLE_ADMIN');

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <WalletDashboard user={user} onNavigate={setView} />;
      case 'history':
        return <TransactionHistory onBack={() => setView('dashboard')} />;
      case 'add':
        return (
          <TransactionForm 
            onBack={() => setView('dashboard')} 
            onSuccess={() => setView('dashboard')} 
          />
        );
      default:
        return <WalletDashboard user={user} onNavigate={setView} />;
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <nav style={{ 
        width: '100%', 
        maxWidth: '800px', 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: '1rem',
        padding: '0 1rem'
      }}>
        {isAdmin && (
          <button
            onClick={onAdminClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--accent)',
              backgroundColor: 'transparent',
              color: 'var(--accent)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.9rem'
            }}
          >
            <ShieldCheck size={16} />
            Admin
          </button>
        )}

        <button
          onClick={onLogout}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 1.2rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            backgroundColor: 'transparent',
            color: '#fca5a5',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '0.9rem'
          }}
        >
          <LogOut size={16} />
          Sair
        </button>
      </nav>

      {renderContent()}
    </div>
  );
};

export default Dashboard;
