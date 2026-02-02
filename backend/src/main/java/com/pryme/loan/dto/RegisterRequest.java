package com.pryme.loan.dto;

public record RegisterRequest(
        String email,
        String password,
        String fullName,
        String mobile
) {}