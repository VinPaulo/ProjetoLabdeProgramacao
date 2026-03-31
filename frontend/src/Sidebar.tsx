import React from 'react';
import { 
  Home, 
  History, 
  PlusCircle, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeView: 'dashboard' | 'history' | 'add' | 'settings';
  onNavigate: (view: 'dashboard' | 'history' | 'add' | 'settings') => void;
  onLogout: () => void;
  isAdmin: boolean;
  onAdminClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onNavigate, 
  onLogout, 
  isAdmin, 
  onAdminClick 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'history', icon: History, label: 'Histórico' },
    { id: 'add', icon: PlusCircle, label: 'Adicionar' },
  ];

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      position: 'sticky',
      top: 0,
      background: 'linear-gradient(180deg, rgba(12, 12, 13, 0.8) 0%, rgba(220, 38, 38, 0.15) 100%)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 0',
      zIndex: 100,
    }}>
      <div style={{ 
        width: '45px', 
        height: '45px', 
        borderRadius: '12px', 
        backgroundColor: 'var(--accent)', 
        color: 'var(--bg-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: '1.2rem',
        marginBottom: '3rem'
      }}>
        P.
      </div>

      <nav style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        flex: 1
      }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as any)}
            title={item.label}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.8rem',
              borderRadius: '12px',
              cursor: 'pointer',
              color: activeView === item.id ? 'var(--accent)' : 'var(--text-muted)',
              backgroundColor: activeView === item.id ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <item.icon size={24} strokeWidth={activeView === item.id ? 2.5 : 2} />
          </button>
        ))}

        {isAdmin && (
          <button
            onClick={onAdminClick}
            title="Painel Admin"
            style={{
              background: 'none',
              border: 'none',
              padding: '0.8rem',
              borderRadius: '12px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShieldCheck size={24} />
          </button>
        )}
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <button
          onClick={() => onNavigate('settings' as any)}
          title="Configurações"
          style={{
            background: 'none',
            border: 'none',
            padding: '0.8rem',
            borderRadius: '12px',
            color: activeView === 'settings' ? 'var(--accent)' : 'var(--text-muted)',
            backgroundColor: activeView === 'settings' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Settings size={24} />
        </button>
        
        <button
          onClick={onLogout}
          title="Sair"
          style={{
            background: 'none',
            border: 'none',
            padding: '0.8rem',
            color: '#fca5a5',
            cursor: 'pointer'
          }}
        >
          <LogOut size={24} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
