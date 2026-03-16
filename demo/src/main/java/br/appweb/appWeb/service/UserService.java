package br.appweb.appWeb.service;

import br.appweb.appWeb.model.User;
import br.appweb.appWeb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Optional<User> authenticate(String email, String password) {
        // In a real scenario, we would use password encoders (e.g., BCrypt)
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Transactional
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Usuário já existe com este e-mail");
        }
        return userRepository.save(user);
    }
}
