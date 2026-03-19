package br.appweb.appWeb.util;

import br.appweb.appWeb.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils { // Classe que gera o token JWT
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${JWT_SECRET}") // Valor da variável de ambiente JWT_SECRET
    private String jwtSecret;

    @Value("${JWT_EXPIRATION_MS}") // Valor da variável de ambiente JWT_EXPIRATION_MS
    private int jwtExpirationMs;

    public String generateJwtToken(User userPrincipal) { // Método que gera o token JWT
        return Jwts.builder()
                .subject((userPrincipal.getUsername()))
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    private SecretKey getSigningKey() { // Método que gera a chave de assinatura
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUserNameFromJwtToken(String token) { // Método que extrai o nome de usuário do token JWT
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) { // Método que valida o token JWT
        try {
            Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Token JWT inválido: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Token JWT expirado: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Token JWT não suportado: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("String de informações do JWT vazia: {}", e.getMessage()); // claims são informações sobre o
                                                                                    // usuário
        }

        return false;
    }
}
