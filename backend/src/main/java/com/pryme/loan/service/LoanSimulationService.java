package com.pryme.loan.service;

import com.pryme.loan.dto.PrePaymentRequest;
import com.pryme.loan.dto.PrePaymentResponse;

public interface LoanSimulationService {
    PrePaymentResponse calculatePrePaymentSavings(PrePaymentRequest request);
}