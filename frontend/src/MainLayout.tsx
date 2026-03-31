import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

interface MainLayoutProps {
  children: React.ReactNode;
  user: any;
  activeView: 'dashboard' | 'history' | 'add' | 'settings';
  onNavigate: (view: 'dashboard' | 'history' | 'add' | 'settings') => void;
  onLogout: () => void;
  onAdminClick: () => void;
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  user, 
  activeView, 
  onNavigate, 
  onLogout, 
  onAdminClick,
  title
}) => {
  const isAdmin = user.roles && user.roles.includes('ROLE_ADMIN');

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeView={activeView} 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        isAdmin={isAdmin}
        onAdminClick={onAdminClick}
      />
      
      <main className="main-content">
        <TopHeader title={title} user={user} />
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
