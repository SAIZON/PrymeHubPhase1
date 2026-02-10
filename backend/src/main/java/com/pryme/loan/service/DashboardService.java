package com.pryme.loan.service;

import com.pryme.loan.dto.*;
import com.pryme.loan.entity.*;
import com.pryme.loan.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ApplicationRepository applicationRepository;
    private final NotificationRepository notificationRepository;
    private final ExternalLoanRepository externalLoanRepository;
    private final UserRepository userRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public DashboardStatsDto getStats(String email) {
        User user = getUser(email);

        long activeApps = applicationRepository.findByUserId(user.getId()).size();
        long unreadNotifs = notificationRepository.countByUserIdAndIsReadFalse(user.getId());

        List<ExternalLoan> loans = externalLoanRepository.findByUserId(user.getId());
        BigDecimal totalDebt = loans.stream()
                .map(ExternalLoan::getOutstandingAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new DashboardStatsDto(activeApps, unreadNotifs, totalDebt);
    }

    public List<ApplicationDto> getRecentApplications(String email) {
        User user = getUser(email);
        return applicationRepository.findByUserId(user.getId()).stream()
                .map(app -> new ApplicationDto(
                        app.getId(),
                        app.getLoanType(),
                        app.getAmount(),
                        app.getStatus().name(),
                        app.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public List<NotificationDto> getNotifications(String email) {
        User user = getUser(email);
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(n -> new NotificationDto(
                        n.getId(),
                        n.getTitle(),
                        n.getMessage(),
                        n.getType(),
                        n.isRead(),
                        n.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public List<ExternalLoanDto> getExternalLoans(String email) {
        User user = getUser(email);
        return externalLoanRepository.findByUserId(user.getId()).stream()
                .map(l -> new ExternalLoanDto(
                        l.getId(),
                        l.getBankName(),
                        l.getLoanType(),
                        l.getOutstandingAmount(),
                        l.getEmiAmount()
                ))
                .collect(Collectors.toList());
    }

    public List<LoanDocumentDto> getUserDocuments(String email) {
        User user = getUser(email);
        List<Application> applications = applicationRepository.findByUserId(user.getId());

        return applications.stream()
                .flatMap(app -> app.getDocuments().stream()) // Flatten list of lists
                .map(doc -> new LoanDocumentDto(
                        doc.getId(),
                        doc.getFileName(),
                        doc.getType().name(),
                        doc.getStatus().name(),
                        doc.getUploadedAt()
                ))
                .collect(Collectors.toList());
    }
}