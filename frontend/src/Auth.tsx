import React, { useState } from 'react';
import authService from './services/authService';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const userData = await authService.login(email, password);
        onLoginSuccess(userData);
      } else {
        await authService.register(name, email, password);
        setMessage('Cadastro realizado! Agora faça login.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      console.error('Auth Error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Erro de conexão com o servidor';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass" style={{
      padding: '2.5rem',
      borderRadius: '1.5rem',
      width: '100%',
      maxWidth: '400px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', color: '#f8fafc' }}>
          {isLogin ? 'Bem-vindo' : 'Crie sua conta'}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          {isLogin ? 'Entre com suas credenciais para acessar' : 'Preencha os dados abaixo para começar'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {!isLogin && (
          <div style={{ position: 'relative' }}>
            <UserIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
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
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                color: 'white',
                boxSizing: 'border-box'
              }}
            />
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              color: 'white',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
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
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              color: 'white',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.8rem',
            borderRadius: '0.75rem',
            border: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '0.5rem',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
          {isLogin ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
        {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: 'none',
            border: 'none',
            color: '#60a5fa',
            cursor: 'pointer',
            fontWeight: 600,
            marginLeft: '0.4rem',
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
          backgroundColor: message.includes('Erro') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
          color: message.includes('Erro') ? '#f87171' : '#34d399',
          fontSize: '0.85rem',
          textAlign: 'center',
          border: `1px solid ${message.includes('Erro') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Auth;
