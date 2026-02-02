package com.pryme.loan.controller;

import com.pryme.loan.dto.PrePaymentRequest;
import com.pryme.loan.dto.PrePaymentResponse;
import com.pryme.loan.service.LoanSimulationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

@RestController
@RequestMapping("/api/v1/calculators")
@CrossOrigin(origins = "http://localhost:3000")
public class CalculatorController {

    private final LoanSimulationService loanSimulationService;

    public CalculatorController(LoanSimulationService loanSimulationService) {
        this.loanSimulationService = loanSimulationService;
    }

    @GetMapping("/emi")
    public ResponseEntity<BigDecimal> calculateEMI(
            @RequestParam double principal,
            @RequestParam double rate,
            @RequestParam double years) {

        BigDecimal p = BigDecimal.valueOf(principal);
        BigDecimal r = BigDecimal.valueOf(rate)
                .divide(BigDecimal.valueOf(12 * 100), 10, RoundingMode.HALF_UP);
        BigDecimal n = BigDecimal.valueOf(years * 12);

        BigDecimal onePlusR = BigDecimal.ONE.add(r);
        BigDecimal numerator = p.multiply(r).multiply(onePlusR.pow(n.intValue()));
        BigDecimal denominator = onePlusR.pow(n.intValue()).subtract(BigDecimal.ONE);

        BigDecimal emi = numerator.divide(denominator, 2, RoundingMode.HALF_UP);

        return ResponseEntity.ok(emi);
    }

    @PostMapping("/prepayment-savings")
    public ResponseEntity<PrePaymentResponse> calculatePrePayment(@RequestBody PrePaymentRequest request) {
        // FIX: Changed 'calculateSavings' to 'calculatePrePaymentSavings'
        return ResponseEntity.ok(loanSimulationService.calculatePrePaymentSavings(request));
    }
}