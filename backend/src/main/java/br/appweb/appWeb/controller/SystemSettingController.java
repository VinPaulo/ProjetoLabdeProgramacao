package br.appweb.appWeb.controller;

import br.appweb.appWeb.model.SystemSetting;
import br.appweb.appWeb.service.SystemSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.lang.NonNull;

@RestController
@RequestMapping("/api/admin/settings")
@PreAuthorize("hasRole('ADMIN')")
public class SystemSettingController {

    @Autowired
    private SystemSettingService settingService;

    @GetMapping
    public ResponseEntity<List<SystemSetting>> getAllSettings() {
        return ResponseEntity.ok(settingService.getAllSettings());
    }

    @PutMapping("/{key}")
    public ResponseEntity<?> updateSetting(@NonNull @PathVariable String key, @RequestBody Map<String, String> body) {
        String value = body.get("value");
        if (value == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "O campo 'value' é obrigatório"));
        }
        settingService.updateSetting(Objects.requireNonNull(key), value);
        return ResponseEntity.ok(Map.of("message", "Configuração " + key + " atualizada para " + value));
    }
    
    @PostMapping("/init")
    public ResponseEntity<?> init() {
        settingService.initDefaultSettings();
        return ResponseEntity.ok(Map.of("message", "Configurações iniciais criadas"));
    }
}
