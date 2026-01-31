package com.pryme.loan.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity @Table(name = "loan_products")
public class LoanProduct {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne @JoinColumn(name = "bank_id")
    private Bank bank;
    private String type; // HOME, PERSONAL
    private BigDecimal interestRate;
    private BigDecimal processingFee;
    private BigDecimal minSalary;
    private Integer minCibil;
    // Getters/Setters...
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public Bank getBank() { return bank; } public void setBank(Bank bank) { this.bank = bank; }
    public String getType() { return type; } public void setType(String type) { this.type = type; }
    public BigDecimal getInterestRate() { return interestRate; } public void setInterestRate(BigDecimal r) { this.interestRate = r; }
    public BigDecimal getProcessingFee() { return processingFee; } public void setProcessingFee(BigDecimal f) { this.processingFee = f; }
    public BigDecimal getMinSalary() { return minSalary; } public void setMinSalary(BigDecimal s) { this.minSalary = s; }
    public Integer getMinCibil() { return minCibil; } public void setMinCibil(Integer c) { this.minCibil = c; }
}