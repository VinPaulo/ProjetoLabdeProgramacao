package br.appweb.appWeb.service;

import br.appweb.appWeb.model.User;
import br.appweb.appWeb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service // Indica que esta classe é um serviço
public class UserService { // Classe que gerencia as operações de usuário

    private final UserRepository userRepository; // Repositório de usuário
    private final PasswordEncoder passwordEncoder; // Codificador de senha

    @Autowired // Injeção de dependência
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true) // Transação de banco de dados
    public Optional<User> authenticate(String email, String password) { // Método que autentica o usuário
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }

    @Transactional // Transação de banco de dados
    public User registerUser(User user) { // Método que registra o usuário
        if (userRepository.existsByEmail(user.getEmail())) { // Verifica se o usuário já existe
            throw new RuntimeException("Usuário já existe com este e-mail"); // Lança uma exceção se o usuário já
                                                                             // existir
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Codifica a senha
        return userRepository.save(user); // Salva o usuário
    }
}
