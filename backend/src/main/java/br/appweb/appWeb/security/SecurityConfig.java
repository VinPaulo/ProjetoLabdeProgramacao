package br.appweb.appWeb.security;

import br.appweb.appWeb.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    UserDetailsServiceImpl userDetailsService; // Injeção de dependência

    @Bean // Bean é um objeto que é gerenciado pelo Spring Framework
    public AuthTokenFilter authenticationJwtTokenFilter() { // Filtro de autenticação
        return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() { // Provedor de autenticação
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception { // Gerenciador
                                                                                                                  // de
                                                                                                                  // autenticação
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() { // Codificador de senha
        return new BCryptPasswordEncoder(); // Funciona fazendo hash das senhas = Hash é um código único que representa
                                            // a senha
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { // Filtro de segurança
        http.csrf(csrf -> csrf.disable()) // Desabilita CSRF (Cross-Site Request Forgery - falsificação de requisição)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sessão
                                                                                                              // stateless
                .authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/**").permitAll() // Permite login e
                                                                                                // registro
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll() // Permite Swagger
                        .anyRequest().authenticated()); // Qualquer outra requisição requer autenticação

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
