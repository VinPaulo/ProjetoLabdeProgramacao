import api from './api';

export interface SystemSetting {
    key: string;
    value: string;
}

const getSettings = async (): Promise<SystemSetting[]> => {
    const response = await api.get('/admin/settings');
    return response.data;
};

const updateSetting = async (key: string, value: string): Promise<void> => {
    await api.put(`/admin/settings/${key}`, { value });
};

export default {
    getSettings,
    updateSetting
};
