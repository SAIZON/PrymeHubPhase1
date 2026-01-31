package com.pryme.loan.service.impl;

import com.pryme.loan.dto.PrePaymentRequest;
import com.pryme.loan.dto.PrePaymentResponse;
import com.pryme.loan.service.LoanSimulationService;
import com.pryme.loan.utils.FinancialUtils; // Assuming you added the Utils class
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class LoanSimulationServiceImpl implements LoanSimulationService {

    private static final BigDecimal STEP_UP_RATE = new BigDecimal("0.05"); // 5% increase

    @Override
    public PrePaymentResponse calculatePrePaymentSavings(PrePaymentRequest request) {
        BigDecimal loanAmount = request.getLoanAmount();
        BigDecimal annualRate = request.getInterestRate();
        int tenureMonths = request.getTenureYears() * 12;

        // 1. Calculate Base EMI using FinancialUtils or local logic
        BigDecimal monthlyRate = FinancialUtils.getMonthlyRate(annualRate);
        BigDecimal baseEmi = FinancialUtils.calculateEmi(loanAmount, annualRate, tenureMonths);

        // 2. Calculate "Regular" Scenario (No Prepayment)
        BigDecimal totalPaymentRegular = baseEmi.multiply(new BigDecimal(tenureMonths));
        BigDecimal totalInterestRegular = totalPaymentRegular.subtract(loanAmount);

        // 3. Simulate "Optimized" Scenario
        SimulationResult simResult = simulateLoanRun(
                loanAmount,
                monthlyRate,
                baseEmi,
                tenureMonths,
                request.isEnable13thEmi(),
                request.isEnableStepUp()
        );

        // 4. Construct Response
        PrePaymentResponse response = new PrePaymentResponse();
        response.setRegularEmi(baseEmi.setScale(0, RoundingMode.HALF_UP));
        response.setRegularTotalInterest(totalInterestRegular.setScale(0, RoundingMode.HALF_UP));

        response.setNewTotalInterest(simResult.totalInterestPaid.setScale(0, RoundingMode.HALF_UP));
        response.setInterestSaved(totalInterestRegular.subtract(simResult.totalInterestPaid).setScale(0, RoundingMode.HALF_UP));

        response.setOriginalMonths(tenureMonths);
        response.setNewMonths(simResult.monthsTaken);
        response.setMonthsSaved(tenureMonths - simResult.monthsTaken);

        // Extra info for UI
        // NOTE: Yearly extra payment is now dynamic in "Aggressive" mode,
        // but for the UI summary, we usually show the STARTING extra payment.
        response.setYearlyExtraPayment(request.isEnable13thEmi() ? baseEmi.setScale(0, RoundingMode.HALF_UP) : BigDecimal.ZERO);
        response.setFirstYearEmi(baseEmi.setScale(0, RoundingMode.HALF_UP));
        response.setLastYearEmi(simResult.lastEmiAmount.setScale(0, RoundingMode.HALF_UP));

        return response;
    }

    private SimulationResult simulateLoanRun(
            BigDecimal principal,
            BigDecimal monthlyRate,
            BigDecimal initialEmi,
            int maxMonths,
            boolean is13thEmi,
            boolean isStepUp
    ) {
        BigDecimal balance = principal;
        BigDecimal totalInterestPaid = BigDecimal.ZERO;
        BigDecimal currentEmi = initialEmi; // This tracks the potentially increasing EMI
        int month = 0;

        while (balance.compareTo(BigDecimal.ZERO) > 0 && month < maxMonths) {
            month++;

            // Calculate Interest for this month
            BigDecimal interestForMonth = balance.multiply(monthlyRate);
            totalInterestPaid = totalInterestPaid.add(interestForMonth);

            // Determine Payment for this month
            BigDecimal paymentForMonth = currentEmi;

            // Strategy 1: 13th EMI (Aggressive Mode)
            // CHANGE: We now add 'currentEmi' instead of 'initialEmi'
            if (is13thEmi && month % 12 == 0) {
                paymentForMonth = paymentForMonth.add(currentEmi);
            }

            // Cap payment if it exceeds balance
            BigDecimal totalDue = balance.add(interestForMonth);
            if (paymentForMonth.compareTo(totalDue) >= 0) {
                paymentForMonth = totalDue;
                balance = BigDecimal.ZERO;
            } else {
                BigDecimal principalComponent = paymentForMonth.subtract(interestForMonth);
                balance = balance.subtract(principalComponent);
            }

            // Strategy 2: Step Up (Increase EMI by 5% at start of every new year)
            if (isStepUp && month % 12 == 0 && balance.compareTo(BigDecimal.ZERO) > 0) {
                currentEmi = currentEmi.multiply(BigDecimal.ONE.add(STEP_UP_RATE));
            }
        }

        return new SimulationResult(totalInterestPaid, month, currentEmi);
    }

    private static class SimulationResult {
        BigDecimal totalInterestPaid;
        int monthsTaken;
        BigDecimal lastEmiAmount;

        public SimulationResult(BigDecimal totalInterestPaid, int monthsTaken, BigDecimal lastEmiAmount) {
            this.totalInterestPaid = totalInterestPaid;
            this.monthsTaken = monthsTaken;
            this.lastEmiAmount = lastEmiAmount;
        }
    }
}