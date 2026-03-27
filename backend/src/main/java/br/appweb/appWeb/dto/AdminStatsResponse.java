package br.appweb.appWeb.dto;

public record AdminStatsResponse(
    long totalUsers,
    long totalTransactions
) {}
