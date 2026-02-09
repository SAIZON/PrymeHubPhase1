package com.pryme.loan.controller;

import com.pryme.loan.dto.BankDto;
import com.pryme.loan.entity.Bank;
import com.pryme.loan.service.AdminBankService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin") // Generalized path
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081"})
public class AdminBankController {

    private final AdminBankService adminBankService;

    public AdminBankController(AdminBankService adminBankService) {
        this.adminBankService = adminBankService;
    }

    // --- BANK MANAGEMENT ---

    @PostMapping("/banks")
    public ResponseEntity<Bank> createBank(@Valid @RequestBody BankDto dto) {
        return ResponseEntity.ok(adminBankService.createBank(dto));
    }

    @GetMapping("/banks")
    public ResponseEntity<List<Bank>> getAllBanks() {
        return ResponseEntity.ok(adminBankService.getAllBanks());
    }

    @PatchMapping("/banks/{id}/toggle")
    public ResponseEntity<Bank> toggleVisibility(@PathVariable Long id) {
        return ResponseEntity.ok(adminBankService.toggleVisibility(id));
    }

    @PutMapping("/banks/{id}")
    public ResponseEntity<Bank> updateBank(@PathVariable Long id, @Valid @RequestBody BankDto dto) {
        return ResponseEntity.ok(adminBankService.updateBank(id, dto));
    }
    // --- PRODUCT MANAGEMENT (The Fix) ---

    // Changed path from /banks/{id}/rate to /products/{id}/rate
    @PatchMapping("/products/{productId}/rate")
    public ResponseEntity<String> updateProductRate(@PathVariable Long productId, @Valid @RequestBody BankDto dto) {
        if (dto.baseInterestRate() == null) {
            return ResponseEntity.badRequest().body("baseInterestRate is required");
        }

        // Use the new precise service method
        adminBankService.updateLoanProductInterestRate(productId, dto.baseInterestRate());

        return ResponseEntity.ok("Interest rate updated for Product ID: " + productId);
    }
}