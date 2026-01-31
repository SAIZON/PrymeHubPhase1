package com.pryme.loan.controller;

import com.pryme.loan.dto.PrePaymentRequest;
import com.pryme.loan.dto.PrePaymentResponse;
import com.pryme.loan.service.LoanSimulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/calculators")
@CrossOrigin(origins = "*") // Configure as per your security needs
public class CalculatorController {

    private final LoanSimulationService loanSimulationService;

    @Autowired
    public CalculatorController(LoanSimulationService loanSimulationService) {
        this.loanSimulationService = loanSimulationService;
    }

    @PostMapping("/prepayment-savings")
    public ResponseEntity<PrePaymentResponse> calculatePrePayment(@RequestBody PrePaymentRequest request) {
        return ResponseEntity.ok(loanSimulationService.calculatePrePaymentSavings(request));
    }
}