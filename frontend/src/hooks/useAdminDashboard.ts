import { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import type { AdminStats, UserAdminInfo } from '../services/adminService';

type AdminSubView = 'main' | 'users' | 'settings';

export const useAdminDashboard = () => { // hook para buscar os dados do admin
    const [subView, setSubView] = useState<AdminSubView>('main');
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [users, setUsers] = useState<UserAdminInfo[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => { // busca os dados do admin
        try {
            const [statsData, usersData] = await Promise.all([
                adminService.getStats(),
                adminService.getUsers()
            ]);
            setStats(statsData);
            setUsers(usersData);
        } catch (error) {
            console.error('Erro ao buscar dados admin:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePromote = async (id: number) => { // promove um usuário a administrador
        if (window.confirm('Deseja promover este usuário a administrador?')) {
            try {
                await adminService.promoteUser(id);
                await fetchData();
                alert('Usuário promovido com sucesso!');
            } catch (error) {
                alert('Erro ao promover usuário');
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja remover este usuário permanentemente?')) {
            try {
                await adminService.deleteUser(id);
                setUsers(prev => prev.filter(u => u.id !== id));
                alert('Usuário removido com sucesso!');
            } catch (error) {
                alert('Erro ao remover usuário');
            }
        }
    };

    return {
        subView, setSubView,
        stats,
        users,
        loading,
        handlePromote,
        handleDelete
    };
};
