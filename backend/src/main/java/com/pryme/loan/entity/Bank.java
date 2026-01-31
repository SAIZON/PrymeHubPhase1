package com.pryme.loan.entity;
import jakarta.persistence.*;
@Entity @Table(name = "banks")
public class Bank {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String logoUrl;
    private boolean isActive = true;
    // Getters/Setters...
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getLogoUrl() { return logoUrl; } public void setLogoUrl(String url) { this.logoUrl = url; }
    public boolean isActive() { return isActive; } public void setActive(boolean active) { isActive = active; }
}