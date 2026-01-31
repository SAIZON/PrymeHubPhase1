package com.pryme.loan.entity;
import jakarta.persistence.*;
@Entity @Table(name = "leads")
public class Lead {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String mobile;
    private String loanType;
    // Getters/Setters...
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getMobile() { return mobile; } public void setMobile(String m) { this.mobile = m; }
    public String getLoanType() { return loanType; } public void setLoanType(String t) { this.loanType = t; }
}