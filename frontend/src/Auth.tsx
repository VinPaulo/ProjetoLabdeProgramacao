import React from 'react';
import { LogIn, UserPlus, Lock, User as UserIcon, Loader2, Mail } from 'lucide-react';
import { useAuth } from './hooks/useAuth';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const {
    isLogin,
    usernameOrEmail,
    password,
    name,
    message,
    loading,
    setUsernameOrEmail,
    setPassword,
    setName,
    handleSubmit,
    toggleLogin
  } = useAuth(onLoginSuccess);

  return (
    <div className="glass" style={{
      padding: '2.5rem',
      borderRadius: '1.5rem',
      width: '100%',
      maxWidth: '400px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--accent)', letterSpacing: '-0.02em' }}>
          {isLogin ? 'Bem-vindo' : 'Crie sua conta'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {isLogin ? 'Entre com suas credenciais para acessar' : 'Preencha os dados abaixo para começar'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {!isLogin && (
          <div style={{ position: 'relative' }}>
            <UserIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-main)',
                boxSizing: 'border-box'
              }}
            />
          </div>
        )}

        <div style={{ position: 'relative' }}>
          {isLogin ? (
            <UserIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          ) : (
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          )}
          <input
            type={isLogin ? "text" : "email"}
            placeholder={isLogin ? "Nome de usuário ou E-mail" : "E-mail válido"}
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--text-main)',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--text-main)',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            border: 'none',
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-main)',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1rem',
            boxShadow: '0 8px 20px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
          {isLogin ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
        <button
          type="button"
          onClick={toggleLogin}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            cursor: 'pointer',
            fontWeight: 700,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            marginLeft: '0.5rem',
            padding: 0
          }}
        >
          {isLogin ? 'Cadastre-se' : 'Faça login'}
        </button>
      </p>

      {message && (
        <div style={{
          marginTop: '1.5rem',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          backgroundColor: message.includes('Erro') ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 255, 255, 0.05)',
          color: message.includes('Erro') ? '#fca5a5' : 'var(--accent)',
          fontSize: '0.85rem',
          textAlign: 'center',
          border: `1px solid ${message.includes('Erro') ? 'rgba(239, 68, 68, 0.2)' : 'var(--border-subtle)'}`
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Auth;
