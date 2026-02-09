package com.pryme.loan.dto;

import java.math.BigDecimal;

public record DashboardStatsDto(
        long activeApplications,
        long unreadNotifications,
        BigDecimal totalExternalDebt
) {}