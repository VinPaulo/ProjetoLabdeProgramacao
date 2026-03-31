package br.appweb.appWeb.controller;

import br.appweb.appWeb.dto.TransactionRequest;
import br.appweb.appWeb.dto.TransactionResponse;
import br.appweb.appWeb.model.Transaction;
import br.appweb.appWeb.model.User;
import br.appweb.appWeb.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;
import java.util.Objects;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getAll() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<TransactionResponse> transactions = transactionService.findAllByUser(user).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(transactions);
    }

    @PostMapping
    public ResponseEntity<TransactionResponse> create(@Valid @RequestBody TransactionRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Transaction transaction = new Transaction(
                request.description(),
                request.amount(),
                request.date(),
                request.type(),
                request.category(),
                user
        );
        Transaction saved = transactionService.save(transaction, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToResponse(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@NonNull @PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        transactionService.delete(Objects.requireNonNull(id), Objects.requireNonNull(user));
        return ResponseEntity.noContent().build();
    }

    private TransactionResponse convertToResponse(Transaction t) {
        return new TransactionResponse(
                t.getId(),
                t.getDescription(),
                t.getAmount(),
                t.getDate(),
                t.getType(),
                t.getCategory()
        );
    }
}
