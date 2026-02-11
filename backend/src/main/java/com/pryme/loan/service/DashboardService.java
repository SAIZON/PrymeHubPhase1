package com.pryme.loan.service;

import com.pryme.loan.dto.*;
import com.pryme.loan.entity.*;
import com.pryme.loan.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final NotificationRepository notificationRepository;
    private final ExternalLoanRepository externalLoanRepository;
    private final LoanProductRepository loanProductRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public DashboardStats getStats(String email) {
        User user = getUser(email);

        // Fix: Repositories return 'long', so we use 'long' here
        long activeApps = applicationRepository.countByUserIdAndStatusNot(user.getId(), ApplicationStatus.REJECTED);
        long unreadNotifs = notificationRepository.countByUserIdAndIsReadFalse(user.getId());

        java.math.BigDecimal totalDebt = externalLoanRepository.findByUserId(user.getId()).stream()
                .map(ExternalLoan::getOutstandingAmount)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

        return new DashboardStats(activeApps, unreadNotifs, totalDebt);
    }

    // --- APPLICATION METHODS ---
    public List<ApplicationDto> getUserApplications(String email) {
        User user = getUser(email);
        return applicationRepository.findByUserId(user.getId()).stream()
                .map(app -> new ApplicationDto(
                        app.getId(),
                        app.getLoanType(),
                        app.getBankName() != null ? app.getBankName() : "Pryme Partner",
                        app.getAmount(),
                        app.getStatus().name(),
                        app.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void submitApplication(String email, ApplicationRequest request) {
        User user = getUser(email);

        Application app = new Application();
        app.setUser(user);
        app.setLoanType(request.loanType());
        app.setAmount(request.amount());
        app.setTenureMonths(request.tenureMonths());
        app.setStatus(ApplicationStatus.SUBMITTED);

        if (request.productId() != null) {
            LoanProduct product = loanProductRepository.findById(request.productId()).orElse(null);
            if (product != null) {
                app.setProductId(product.getId());
                app.setProductName(product.getType());
                if (product.getBank() != null) {
                    app.setBankName(product.getBank().getName());
                }
            }
        } else {
            app.setBankName("Pryme Partner Bank");
            app.setProductName(request.loanType());
        }

        applicationRepository.save(app);

        // Create Notification
        Notification notif = new Notification();
        notif.setUser(user);
        notif.setTitle("Application Submitted");
        notif.setMessage("Your application for " + app.getBankName() + " has been received.");
        notif.setType("INFO");
        notif.setCreatedAt(java.time.LocalDateTime.now());
        notificationRepository.save(notif);
    }

    // --- NOTIFICATION METHODS (Fixes "Cannot resolve method") ---
    public List<Notification> getNotifications(String email) {
        User user = getUser(email);
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    // --- EXTERNAL LOAN METHODS (Fixes "Cannot resolve method") ---
    public List<ExternalLoan> getExternalLoans(String email) {
        User user = getUser(email);
        return externalLoanRepository.findByUserId(user.getId());
    }

    // --- DOCUMENT METHODS ---
    public List<LoanDocumentDto> getUserDocuments(String email) {
        // Placeholder until Document logic is fully implemented
        return List.of();
    }
}