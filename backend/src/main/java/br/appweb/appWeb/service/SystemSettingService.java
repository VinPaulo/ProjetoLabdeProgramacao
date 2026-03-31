package br.appweb.appWeb.service;

import br.appweb.appWeb.model.SystemSetting;
import br.appweb.appWeb.repository.SystemSettingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;
import java.util.Objects;

import java.util.List;

@Service
public class SystemSettingService {

    private static final Logger logger = LoggerFactory.getLogger(SystemSettingService.class);

    @Autowired
    private SystemSettingRepository settingRepository;

    @Transactional(readOnly = true)
    @NonNull
    public String getSetting(@NonNull String key, @NonNull String defaultValue) {
        return Objects.requireNonNull(settingRepository.findById(key)
                .map(SystemSetting::getValue)
                .orElse(defaultValue));
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("null")
    public boolean getBooleanSetting(@NonNull String key, boolean defaultValue) {
        String value = getSetting(key, String.valueOf(defaultValue));
        return Boolean.parseBoolean(value);
    }

    @Transactional
    public void updateSetting(@NonNull String key, @NonNull String value) {
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
            logger.info("Configuração padrão inicializada: registration_enabled = true");
        }
        if (!settingRepository.existsById("maintenance_mode")) {
            updateSetting("maintenance_mode", "false");
            logger.info("Configuração padrão inicializada: maintenance_mode = false");
        }
    }
}
