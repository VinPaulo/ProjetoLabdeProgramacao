package br.appweb.appWeb.controller;

import br.appweb.appWeb.dto.AdminStatsResponse;
import br.appweb.appWeb.dto.UserResponse;
import br.appweb.appWeb.service.UserService;
import br.appweb.appWeb.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;
import java.util.Objects;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers().stream()
                .map(user -> new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRoles()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@NonNull @PathVariable Long id) {
        userService.deleteUserSafely(Objects.requireNonNull(id));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        long totalUsers = userService.countUsers();
        long totalTransactions = transactionService.countTransactions();
        return ResponseEntity.ok(new AdminStatsResponse(totalUsers, totalTransactions));
    }

    @PutMapping("/promote/{id}")
    public ResponseEntity<?> promoteToAdmin(@NonNull @PathVariable Long id) {
        userService.promoteToAdmin(Objects.requireNonNull(id));
        return ResponseEntity.ok(Map.of("message", "Usuário promovido a ADMIN com sucesso!"));
    }
}
