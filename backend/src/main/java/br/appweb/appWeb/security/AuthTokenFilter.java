package br.appweb.appWeb.security;

import br.appweb.appWeb.service.UserDetailsServiceImpl;
import br.appweb.appWeb.util.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException { // Filtro que intercepta as requisições
        try {
            String jwt = parseJwt(request); // Extrai o token JWT
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) { // Valida o token JWT
                String username = jwtUtils.getUserNameFromJwtToken(jwt); // Extrai o nome de usuário do token JWT

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken( // Cria um
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Usuário não autenticado: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) { // Método que extrai o token JWT
        String headerAuth = request.getHeader("Authorization"); // Pega o token JWT do header

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) { // Verifica se o token JWT é válido
            return headerAuth.substring(7); // Retorna o token JWT
        }

        return null; // Retorna null se o token JWT não for válido
    }
}
