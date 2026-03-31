import React, { useState } from 'react';
import MainLayout from './MainLayout';
import WalletDashboard from './WalletDashboard';
import TransactionHistory from './TransactionHistory';
import TransactionForm from './TransactionForm';

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onAdminClick: () => void;
}

type WalletView = 'dashboard' | 'history' | 'add' | 'settings';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onAdminClick }) => {
  const [view, setView] = useState<WalletView>('dashboard');

  const getTitle = () => {
    switch (view) {
      case 'dashboard': return 'P.Wallet - Carteira de controle de gastos';
      case 'history': return 'Histórico de Transações';
      case 'add': return 'Nova Transação';
      case 'settings': return 'Configurações';
      default: return 'P.Wallet - Carteira de controle de gastos';
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <WalletDashboard onNavigate={setView} />;
      case 'history':
        return <TransactionHistory onBack={() => setView('dashboard')} />;
      case 'add':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <TransactionForm 
              onBack={() => setView('dashboard')} 
              onSuccess={() => setView('dashboard')} 
            />
          </div>
        );
      case 'settings':
        return (
          <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>Configurações da Conta</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Recursos de perfil e preferências em desenvolvimento.</p>
            <button onClick={() => setView('dashboard')} className="btn-primary">Voltar ao Início</button>
          </div>
        );
      default:
        return <WalletDashboard onNavigate={setView} />;
    }
  };

  return (
    <MainLayout
      user={user}
      activeView={view}
      onNavigate={setView}
      onLogout={onLogout}
      onAdminClick={onAdminClick}
      title={getTitle()}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default Dashboard;
