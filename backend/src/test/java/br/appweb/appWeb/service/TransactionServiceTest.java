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
import java.util.Arrays;

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
    void saveTransaction_Success() {
        User user = new User();
        Transaction transaction = new Transaction();
        transaction.setAmount(new BigDecimal("100.00"));

        when(transactionRepository.save(any())).thenReturn(transaction);

        Transaction saved = transactionService.save(transaction, user);

        assertNotNull(saved);
        assertEquals(new BigDecimal("100.00"), saved.getAmount());
    }

    @Test
    void calculateBalance_CorrectlySums() {
        User user = new User();
        user.setId(1L);

        Transaction t1 = new Transaction();
        t1.setAmount(new BigDecimal("1000.00"));
        t1.setType(TransactionType.INCOME);

        Transaction t2 = new Transaction();
        t2.setAmount(new BigDecimal("400.00"));
        t2.setType(TransactionType.EXPENSE);

        when(transactionRepository.findByUserOrderByDateDesc(user)).thenReturn(Arrays.asList(t1, t2));

        BigDecimal balance = transactionService.calculateBalance(user);

        assertEquals(0, balance.compareTo(new BigDecimal("600.00")));
    }
}
