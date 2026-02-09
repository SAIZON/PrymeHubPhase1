package com.pryme.loan.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity @Table(name = "banks")
public class Bank {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String logoUrl;
    private boolean isActive = true;
    @Column(precision = 5, scale = 2) // Stores rates like 10.50
    private BigDecimal baseInterestRate;
    // Getters/Setters...
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getLogoUrl() { return logoUrl; } public void setLogoUrl(String url) { this.logoUrl = url; }
    public boolean isActive() { return isActive; } public void setActive(boolean active) { isActive = active; }
    public BigDecimal getBaseInterestRate() { return baseInterestRate; }
    public void setBaseInterestRate(BigDecimal baseInterestRate) { this.baseInterestRate = baseInterestRate; }
}