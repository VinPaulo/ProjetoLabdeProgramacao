import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  title: string;
  user: any;
}

const TopHeader: React.FC<TopHeaderProps> = ({ title, user }) => {
  return (
    <header style={{
      height: 'var(--header-height)',
      width: '100%',
      padding: '0 var(--content-padding)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      background: 'linear-gradient(90deg, rgba(12, 12, 13, 0.8) 0%, rgba(220, 38, 38, 0.15) 100%)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 700, 
          margin: 0,
          color: 'var(--text-main)',
          letterSpacing: '-0.5px'
        }}>
          {title}
        </h2>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.5rem' 
      }}>
        {/* Placeholder para Busca */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          cursor: 'text'
        }}>
          <Search size={16} />
          <span>Fazer busca...</span>
        </div>

        <button style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--text-muted)', 
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '8px'
        }}>
          <Bell size={20} />
        </button>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.8rem',
          padding: '0.4rem',
          paddingLeft: '0.8rem',
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          cursor: 'pointer'
        }}>
          <span style={{ 
            fontSize: '0.9rem', 
            fontWeight: 600, 
            color: 'var(--text-main)' 
          }}>
            {user.name || user.username}
          </span>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            backgroundColor: 'var(--accent)', 
            color: 'var(--bg-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 800
          }}>
            {(user.name || user.username).substring(0, 2).toUpperCase()}
          </div>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
