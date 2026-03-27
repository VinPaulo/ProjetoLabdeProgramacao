package br.appweb.appWeb.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class) // Tratamento de exceções de validação
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String errorMessage = error.getDefaultMessage();
            errors.put("message", errorMessage);
        });
        logger.warn("Erro de validação: {}", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(BadCredentialsException.class) // Tratamento de exceções de autenticação
    public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException ex) {
        logger.warn("Falha na tentativa de login: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "E-mail ou senha inválidos"));
    }

    @ExceptionHandler(RuntimeException.class) // Tratamento de exceções de runtime
    public ResponseEntity<Map<String, String>> handleRuntimeExceptions(RuntimeException ex) {
        logger.error("Erro de execução (RuntimeException): {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class) // Tratamento de exceções gerais
    public ResponseEntity<Map<String, String>> handleGeneralExceptions(Exception ex) {
        logger.error("Erro interno não esperado: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Ocorreu um erro interno no servidor"));
    }
}
