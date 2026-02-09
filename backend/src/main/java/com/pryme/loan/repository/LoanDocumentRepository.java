package com.pryme.loan.repository;

import com.pryme.loan.entity.LoanDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface LoanDocumentRepository extends JpaRepository<LoanDocument, UUID> {
    List<LoanDocument> findByApplicationId(UUID applicationId);
}