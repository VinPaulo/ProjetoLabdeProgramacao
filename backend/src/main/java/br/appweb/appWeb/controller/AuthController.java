package br.appweb.appWeb.controller;

import br.appweb.appWeb.dto.JwtResponse;
import br.appweb.appWeb.service.SystemSettingService;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import br.appweb.appWeb.dto.LoginRequest;
import br.appweb.appWeb.dto.UserRegistrationRequest;
import br.appweb.appWeb.dto.UserResponse;
import br.appweb.appWeb.model.Role;
import br.appweb.appWeb.model.User;
import br.appweb.appWeb.service.UserService;
import br.appweb.appWeb.util.JwtUtils;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;

@RestController // Indica que a classe é um controlador REST
@RequestMapping("/api/auth") // Mapeia as requisições para /api/auth
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final SystemSettingService settingService;

    @Autowired // Injeção de dependência
    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtils jwtUtils,
            SystemSettingService settingService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.settingService = settingService; // settingService é usado para verificar se o sistema está em manutenção
    }

    @PostMapping("/login") // Endpoint de login
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest credentials) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.getUsernameOrEmail(), credentials.getPassword()));

        if (settingService.getBooleanSetting("maintenance_mode", false)) { // Verifica se o sistema está em manutenção
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body(Map.of("message", "O sistema está em manutenção. Tente novamente mais tarde."));
            }
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken((User) authentication.getPrincipal());

        User userDetails = (User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        logger.info("Login bem-sucedido para o usuário: {}", userDetails.getEmail());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getName(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/register") // Endpoint de registro
    public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationRequest signUpRequest) {
        if (!settingService.getBooleanSetting("registration_enabled", true)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Novos cadastros estão desabilitados temporariamente."));
        }
        try {
            User user = new User(signUpRequest.getName(), signUpRequest.getEmail(), signUpRequest.getPassword());

            // Se for o primeiro usuário do sistema, ganha ROLE_ADMIN automaticamente
            if (userService.countUsers() == 0) {
                user.setRoles(new HashSet<>(Set.of(Role.ROLE_USER, Role.ROLE_ADMIN)));
            } else {
                user.setRoles(new HashSet<>(Set.of(Role.ROLE_USER)));
            }

            User registeredUser = userService.registerUser(user);

            UserResponse response = new UserResponse(
                    registeredUser.getId(),
                    registeredUser.getName(),
                    registeredUser.getEmail(),
                    registeredUser.getRoles());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
