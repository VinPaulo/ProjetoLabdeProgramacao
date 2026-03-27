package br.appweb.appWeb.service;

import br.appweb.appWeb.model.Transaction;
import br.appweb.appWeb.model.User;
import br.appweb.appWeb.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionService { // Classe responsável por gerenciar as transações

    private final TransactionRepository transactionRepository; // Repositório de transações

    @Autowired // Injeção de dependência
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Transactional(readOnly = true)
    public List<Transaction> findAllByUser(User user) {
        return transactionRepository.findByUserOrderByDateDesc(user);
    }

    @Transactional
    public Transaction save(Transaction transaction, User user) { // Método para salvar uma transação
        transaction.setUser(user);
        return transactionRepository.save(transaction);
    }

    @Transactional
    public void delete(Long id, User user) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada"));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Operação não permitida");
        }

        transactionRepository.delete(transaction);
    }
}
