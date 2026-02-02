package com.pryme.loan.dto;

public record AuthResponse(
        String token,
        String role,
        String fullName
) {}