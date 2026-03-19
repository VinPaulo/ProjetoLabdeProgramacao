import { useState } from 'react';
import authService from '../services/authService';

export const useAuth = (onLoginSuccess: (user: any) => void) => { // Hook para autenticação 
  const [isLogin, setIsLogin] = useState(true);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try { // Tenta fazer login ou registrar
      if (isLogin) {
        const userData = await authService.login(usernameOrEmail, password);
        onLoginSuccess(userData);
      } else {
        await authService.register(name, usernameOrEmail, password);
        setMessage('Cadastro realizado! Agora faça login.');
        setIsLogin(true);
        setUsernameOrEmail('');
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

  const toggleLogin = () => setIsLogin(!isLogin);

  return { // Retorna os dados para o componente
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
  };
};
