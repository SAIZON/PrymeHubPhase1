package com.pryme.loan.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ApplicationDto(
        UUID id,
        String loanType,
        BigDecimal amount,
        String status,
        LocalDateTime createdAt
) {}