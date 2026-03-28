package br.appweb.appWeb.service;

import br.appweb.appWeb.model.SystemSetting;
import br.appweb.appWeb.repository.SystemSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SystemSettingService {

    @Autowired
    private SystemSettingRepository settingRepository;

    @Transactional(readOnly = true)
    public String getSetting(String key, String defaultValue) {
        return settingRepository.findById(key)
                .map(SystemSetting::getValue)
                .orElse(defaultValue);
    }

    @Transactional(readOnly = true)
    public boolean getBooleanSetting(String key, boolean defaultValue) {
        String value = getSetting(key, String.valueOf(defaultValue));
        return Boolean.parseBoolean(value);
    }

    @Transactional
    public void updateSetting(String key, String value) {
        SystemSetting setting = settingRepository.findById(key)
                .orElse(new SystemSetting(key, value));
        setting.setValue(value);
        settingRepository.save(setting);
    }

    @Transactional(readOnly = true)
    public List<SystemSetting> getAllSettings() {
        return settingRepository.findAll();
    }
    
    @Transactional
    @EventListener(ApplicationReadyEvent.class)
    public void initDefaultSettings() {
        if (!settingRepository.existsById("registration_enabled")) {
            updateSetting("registration_enabled", "true");
        }
        if (!settingRepository.existsById("maintenance_mode")) {
            updateSetting("maintenance_mode", "false");
        }
    }
}
