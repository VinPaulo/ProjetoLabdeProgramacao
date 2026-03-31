package br.appweb.appWeb.service;

import br.appweb.appWeb.model.Transaction;
import br.appweb.appWeb.model.TransactionType;
import br.appweb.appWeb.model.User;
import br.appweb.appWeb.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionService transactionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @SuppressWarnings("null")
    void saveTransaction_Success() {
        User user = new User();
        Transaction transaction = new Transaction();
        transaction.setAmount(new BigDecimal("100.00"));

        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        Transaction saved = Objects.requireNonNull(transactionService.save(transaction, user));

        assertNotNull(saved);
        assertEquals(new BigDecimal("100.00"), Objects.requireNonNull(saved).getAmount());
    }

    @Test
    @SuppressWarnings("null")
    void calculateBalance_CorrectlySums() {
        User user = new User();
        user.setId(1L);

        when(transactionRepository.sumAmountByUserAndType(user, TransactionType.INCOME))
                .thenReturn(new BigDecimal("1000.00"));
        when(transactionRepository.sumAmountByUserAndType(user, TransactionType.EXPENSE))
                .thenReturn(new BigDecimal("400.00"));

        BigDecimal balance = transactionService.calculateBalance(user);

        assertEquals(0, balance.compareTo(new BigDecimal("600.00")));
    }
}
