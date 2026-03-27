package br.appweb.appWeb.dto;

import br.appweb.appWeb.model.TransactionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(
    @NotBlank(message = "Descrição é obrigatória")
    String description,
    
    @NotNull(message = "Valor é obrigatório")
    BigDecimal amount,
    
    @NotNull(message = "Data é obrigatória")
    LocalDate date,
    
    @NotNull(message = "Tipo é obrigatório")
    TransactionType type,
    
    @NotBlank(message = "Categoria é obrigatória")
    String category
) {}
