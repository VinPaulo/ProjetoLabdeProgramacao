import { useState, useEffect } from 'react';
import systemSettingService from '../services/systemSettingService';
import type { SystemSetting } from '../services/systemSettingService';

export const useSystemSettings = () => {
    const [settings, setSettings] = useState<SystemSetting[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const data = await systemSettingService.getSettings();
            setSettings(data);
        } catch (error) {
            console.error('Erro ao buscar configurações:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const toggleSetting = async (key: string) => {
        const setting = settings.find(s => s.key === key);
        if (!setting) return;

        const newValue = setting.value === 'true' ? 'false' : 'true';
        try {
            await systemSettingService.updateSetting(key, newValue);
            setSettings(prev => prev.map(s => s.key === key ? { ...s, value: newValue } : s));
        } catch (error: any) {
            console.error('Erro ao atualizar configuração:', error);
            const msg = error.response?.data?.message || 'Erro de conexão com o servidor';
            alert(`Erro ao atualizar: ${msg} (Status: ${error.response?.status})`);
        }
    };

    const isEnabled = (key: string) => {
        return settings.find(s => s.key === key)?.value === 'true';
    };

    return {
        settings,
        loading,
        toggleSetting,
        isEnabled,
        refresh: fetchSettings
    };
};
