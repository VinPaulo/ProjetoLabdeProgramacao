package br.appweb.appWeb.dto;

import br.appweb.appWeb.model.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionResponse(
    Long id,
    String description,
    BigDecimal amount,
    LocalDate date,
    TransactionType type,
    String category
) {}
