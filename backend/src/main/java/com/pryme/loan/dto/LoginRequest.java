package com.pryme.loan.dto;

public record LoginRequest(
        String email,
        String password
) {}