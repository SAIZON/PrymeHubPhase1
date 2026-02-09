package com.pryme.loan.service;

import com.pryme.loan.dto.BankDto;
import com.pryme.loan.entity.Bank;
import com.pryme.loan.entity.LoanProduct;
import com.pryme.loan.repository.BankRepository;
import com.pryme.loan.repository.LoanProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AdminBankService {

    private final BankRepository bankRepository;
    private final LoanProductRepository loanProductRepository;

    public AdminBankService(BankRepository bankRepository, LoanProductRepository loanProductRepository) {
        this.bankRepository = bankRepository;
        this.loanProductRepository = loanProductRepository;
    }

    public Bank createBank(BankDto dto) {
        Bank bank = new Bank();
        bank.setName(dto.name());
        bank.setLogoUrl(dto.logoUrl());
        bank.setActive(dto.active());

        bank.setBaseInterestRate(dto.baseInterestRate());
        return bankRepository.save(bank);
    }

    public List<Bank> getAllBanks() {
        return bankRepository.findAll();
    }

    @Transactional
    public Bank toggleVisibility(Long id) {
        Bank bank = bankRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bank not found"));
        bank.setActive(!bank.isActive());
        return bankRepository.save(bank);
    }



    @Transactional
    public Bank updateBank(Long id, BankDto dto) {
        Bank bank = bankRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bank not found"));

        bank.setName(dto.name());
        bank.setLogoUrl(dto.logoUrl());
        bank.setActive(dto.active()); // Optional: Update active status here if you want
        bank.setBaseInterestRate(dto.baseInterestRate());

        return bankRepository.save(bank);
    }


    @Transactional
    public void updateLoanProductInterestRate(Long productId, BigDecimal newRate) {
        LoanProduct product = loanProductRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Loan Product not found with ID: " + productId));

        product.setInterestRate(newRate);
        loanProductRepository.save(product);
    }
}