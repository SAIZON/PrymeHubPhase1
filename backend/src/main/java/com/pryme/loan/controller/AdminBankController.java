package com.pryme.loan.controller;

import com.pryme.loan.dto.BankDto;
import com.pryme.loan.entity.Bank;
import com.pryme.loan.service.AdminBankService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/banks")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminBankController {

    private final AdminBankService adminBankService;

    public AdminBankController(AdminBankService adminBankService) {
        this.adminBankService = adminBankService;
    }

    @PostMapping
    public ResponseEntity<Bank> createBank(@Valid @RequestBody BankDto dto) {
        return ResponseEntity.ok(adminBankService.createBank(dto));
    }

    @GetMapping
    public ResponseEntity<List<Bank>> getAllBanks() {
        return ResponseEntity.ok(adminBankService.getAllBanks());
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Bank> toggleVisibility(@PathVariable Long id) {
        return ResponseEntity.ok(adminBankService.toggleVisibility(id));
    }

    @PatchMapping("/{id}/rate")
    public ResponseEntity<String> updateInterestRate(@PathVariable Long id, @Valid @RequestBody BankDto dto) {
        if (dto.baseInterestRate() == null) {
            return ResponseEntity.badRequest().body("baseInterestRate is required");
        }
        adminBankService.updateBaseInterestRate(id, dto.baseInterestRate());
        return ResponseEntity.ok("Interest rates updated successfully");
    }
}