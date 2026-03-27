package br.appweb.appWeb.controller;

import br.appweb.appWeb.dto.AdminStatsResponse;
import br.appweb.appWeb.dto.UserResponse;
import br.appweb.appWeb.model.Role;
import br.appweb.appWeb.model.User;
import br.appweb.appWeb.repository.TransactionRepository;
import br.appweb.appWeb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userRepository.findAll().stream()
                .map(user -> new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRoles()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        long totalUsers = userRepository.count();
        long totalTransactions = transactionRepository.count();
        return ResponseEntity.ok(new AdminStatsResponse(totalUsers, totalTransactions));
    }

    @PutMapping("/promote/{id}")
    public ResponseEntity<?> promoteToAdmin(@PathVariable Long id) { // Promove um usuário a ADMIN
        return userRepository.findById(id)
                .map((User user) -> {
                    user.getRoles().add(Role.ROLE_ADMIN);
                    userRepository.save(user);
                    return ResponseEntity
                            .ok(Map.of("message", "Usuário " + user.getName() + " promovido a ADMIN com sucesso!")); // Retorna
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
