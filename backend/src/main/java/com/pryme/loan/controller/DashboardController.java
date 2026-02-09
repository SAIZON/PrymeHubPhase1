package com.pryme.loan.controller;

import com.pryme.loan.dto.*;
import com.pryme.loan.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getStats(Principal principal) {
        return ResponseEntity.ok(dashboardService.getStats(principal.getName()));
    }

    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDto>> getApplications(Principal principal) {
        return ResponseEntity.ok(dashboardService.getRecentApplications(principal.getName()));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationDto>> getNotifications(Principal principal) {
        return ResponseEntity.ok(dashboardService.getNotifications(principal.getName()));
    }

    @GetMapping("/external-loans")
    public ResponseEntity<List<ExternalLoanDto>> getExternalLoans(Principal principal) {
        return ResponseEntity.ok(dashboardService.getExternalLoans(principal.getName()));
    }
}