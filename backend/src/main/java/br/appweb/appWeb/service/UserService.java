package br.appweb.appWeb.service;

import br.appweb.appWeb.model.User;
import br.appweb.appWeb.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.appweb.appWeb.model.Role;
import br.appweb.appWeb.repository.TransactionRepository;
import org.springframework.lang.NonNull;
import java.util.Objects;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionRepository transactionRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.transactionRepository = transactionRepository;
    }

    @Transactional(readOnly = true)
    public Optional<User> authenticate(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }

    @Transactional
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Usuario ja existe com este e-mail");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        logger.info("Novo usuario criado com sucesso: {}", savedUser.getEmail());
        return savedUser;
    }

    @Transactional(readOnly = true)
    public long countUsers() {
        return userRepository.count();
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void promoteToAdmin(@NonNull Long id) {
        User user = Objects.requireNonNull(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado")));
        user.getRoles().add(Role.ROLE_ADMIN);
        userRepository.save(user);
    }

    @Transactional
    public void deleteUserSafely(@NonNull Long id) {
        User user = Objects.requireNonNull(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado")));

        // Verifica se existem transações para evitar erro de integridade (poderia ser feito via COUNT no repositório)
        if (!transactionRepository.findByUserOrderByDateDesc(Objects.requireNonNull(user)).isEmpty()) {
            throw new RuntimeException("Não é possível excluir um usuário que possui transações vinculadas.");
        }

        userRepository.delete(user);
    }
}
