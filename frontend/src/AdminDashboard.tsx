import React from 'react';
import { Users, Settings, LogOut, ArrowLeft, ShieldCheck, UserPlus, Trash2, TrendingUp, Activity } from 'lucide-react';
import { useAdminDashboard } from './hooks/useAdminDashboard';
import type { UserAdminInfo } from './services/adminService';

interface AdminDashboardProps {
    user: any;
    onBack: () => void;
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onBack, onLogout }) => {
    const {
        subView, setSubView,
        stats,
        users,
        loading,
        handlePromote,
        handleDelete
    } = useAdminDashboard();

    const renderMain = () => (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div style={{ 
                    padding: '1.5rem', 
                    borderRadius: '1.25rem', 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'left'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                        <TrendingUp size={20} />
                        <span style={{ fontWeight: 600 }}>Total de Usuários</span>
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>{stats?.totalUsers || 0}</span>
                </div>

                <div style={{ 
                    padding: '1.5rem', 
                    borderRadius: '1.25rem', 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'left'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                        <Activity size={20} />
                        <span style={{ fontWeight: 600 }}>Total de Transações</span>
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>{stats?.totalTransactions || 0}</span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div 
                    onClick={() => setSubView('users')}
                    className="glass-card" 
                    style={{
                        padding: '2rem',
                        borderRadius: '1.25rem',
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center'
                    }}
                >
                    <Users size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>Gerenciar Usuários</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lista de usuários e permissões</p>
                </div>

                <div className="glass-card" style={{
                    padding: '2rem',
                    borderRadius: '1.25rem',
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    opacity: 0.5
                }}>
                    <Settings size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>Configurações</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ajustes globais (Em breve)</p>
                </div>
            </div>
        </>
    );

    const renderUsers = () => (
        <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Usuários do Sistema</h2>
                <button onClick={() => setSubView('main')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>
                    Voltar
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {users.map((u: UserAdminInfo) => (
                    <div key={u.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.25rem',
                        borderRadius: '1rem',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-subtle)'
                    }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{u.name}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{u.email} • {u.roles.join(', ')}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {!u.roles.includes('ROLE_ADMIN') && (
                                <button 
                                    onClick={() => handlePromote(u.id)}
                                    title="Promover a Admin"
                                    style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
                                >
                                    <UserPlus size={18} />
                                </button>
                            )}
                            {u.id !== user.id && (
                                <button 
                                    onClick={() => handleDelete(u.id)}
                                    title="Remover Usuário"
                                    style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="glass" style={{
            padding: '3rem',
            borderRadius: '1.5rem',
            width: '100%',
            maxWidth: '900px',
            textAlign: 'center'
        }}>
            <header style={{ marginBottom: '2.5rem', position: 'relative' }}>
                <button 
                    onClick={onBack}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}
                >
                    <ArrowLeft size={18} />
                    Painel Usuário
                </button>

                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(168, 85, 247, 0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 1.5rem',
                    border: '1px solid var(--accent)'
                }}>
                    <ShieldCheck size={32} color="var(--accent)" />
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    Admin Panel
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Modo Administrador • {user.email}
                </p>
            </header>

            {loading ? <p>Carregando...</p> : subView === 'main' ? renderMain() : renderUsers()}

            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={onLogout}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.8rem 1.8rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        backgroundColor: 'transparent',
                        color: '#fca5a5',
                        fontWeight: 700,
                        cursor: 'pointer'
                    }}
                >
                    <LogOut size={18} />
                    Sair Sistema
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
