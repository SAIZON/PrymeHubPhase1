import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserCheck, AlertCircle, CheckCircle, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function formatCurrency(value: number) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function EligibilityCheck() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanType: "",
    monthlyIncome: "",
    occupation: "",
    existingEMIs: "",
    age: "",
    creditScore: "",
  });

  const eligibility = useMemo(() => {
    const income = Number(formData.monthlyIncome) || 0;
    const emis = Number(formData.existingEMIs) || 0;
    const age = Number(formData.age) || 0;
    const creditScore = Number(formData.creditScore) || 0;

    if (!income || !formData.occupation || !age) {
      return null;
    }

    // FOIR calculation
    const maxFOIR = formData.occupation === "salaried" ? 0.5 : formData.occupation === "self-employed" ? 0.4 : 0.45;
    const availableForEMI = (income * maxFOIR) - emis;

    if (availableForEMI <= 0) {
      return { eligible: false, maxAmount: 0, maxEMI: 0, approval: "low", reasons: ["High existing debt burden"] };
    }

    // Get interest rate and tenure based on loan type
    let interestRate = 10;
    let maxTenure = 20;
    
    if (formData.loanType === "home") {
      interestRate = 8.5;
      maxTenure = 30;
    } else if (formData.loanType === "personal") {
      interestRate = 12;
      maxTenure = 5;
    } else if (formData.loanType === "business") {
      interestRate = 14;
      maxTenure = 7;
    }

    const monthlyRate = interestRate / 12 / 100;
    const months = maxTenure * 12;

    const maxLoanAmount =
      (availableForEMI * (Math.pow(1 + monthlyRate, months) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, months));

    // Determine approval chances
    let approval = "high";
    const reasons: string[] = [];

    if (creditScore && creditScore < 650) {
      approval = "low";
      reasons.push("Credit score below 650");
    } else if (creditScore && creditScore < 700) {
      approval = "medium";
      reasons.push("Credit score can be improved");
    }

    if (age < 21 || age > 60) {
      approval = "low";
      reasons.push("Age outside preferred range (21-60)");
    }

    if (income < 20000) {
      if (approval !== "low") approval = "medium";
      reasons.push("Income below preferred threshold");
    }

    return {
      eligible: maxLoanAmount > 100000,
      maxAmount: Math.round(maxLoanAmount),
      maxEMI: Math.round(availableForEMI),
      approval,
      reasons: reasons.length > 0 ? reasons : ["All eligibility criteria met"],
      interestRate,
      maxTenure,
    };
  }, [formData]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-20">
        <div className="container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <UserCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Check Your Loan Eligibility
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find out how much you can borrow in just 2 minutes. No impact on your credit score.
          </p>
        </div>
      </section>

      {/* Eligibility Form */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form */}
              <Card className="lg:col-span-3 shadow-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Enter Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Loan Type *</Label>
                    <Select
                      value={formData.loanType}
                      onValueChange={(value) => setFormData({ ...formData, loanType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Loan</SelectItem>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Monthly Income (₹) *</Label>
                      <Input
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                        placeholder="e.g., 75000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Occupation *</Label>
                      <Select
                        value={formData.occupation}
                        onValueChange={(value) => setFormData({ ...formData, occupation: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select occupation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salaried">Salaried</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="professional">Professional (Doctor, CA)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Age *</Label>
                      <Input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="e.g., 35"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Credit Score (optional)</Label>
                      <Input
                        type="number"
                        value={formData.creditScore}
                        onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
                        placeholder="e.g., 750"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Existing EMIs (₹/month)</Label>
                    <Input
                      type="number"
                      value={formData.existingEMIs}
                      onChange={(e) => setFormData({ ...formData, existingEMIs: e.target.value })}
                      placeholder="Total of all existing loan EMIs"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="lg:col-span-2 shadow-card border-border/50 h-fit">
                <CardHeader>
                  <CardTitle>Your Eligibility</CardTitle>
                </CardHeader>
                <CardContent>
                  {eligibility ? (
                    <div className="space-y-6">
                      {eligibility.eligible ? (
                        <>
                          <div className={`p-4 rounded-lg border text-center ${
                            eligibility.approval === "high" 
                              ? "bg-success/10 border-success/20" 
                              : eligibility.approval === "medium"
                              ? "bg-warning/10 border-warning/20"
                              : "bg-destructive/10 border-destructive/20"
                          }`}>
                            <p className="text-sm text-muted-foreground mb-1">Maximum Loan Amount</p>
                            <p className="text-3xl font-bold text-primary">
                              {formatCurrency(eligibility.maxAmount)}
                            </p>
                            <div className={`inline-flex items-center gap-1 mt-2 text-sm font-medium ${
                              eligibility.approval === "high" 
                                ? "text-success" 
                                : eligibility.approval === "medium"
                                ? "text-warning-foreground"
                                : "text-destructive"
                            }`}>
                              {eligibility.approval === "high" ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <AlertCircle className="h-4 w-4" />
                              )}
                              {eligibility.approval === "high" ? "High" : eligibility.approval === "medium" ? "Medium" : "Low"} Approval Chance
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-muted/50 rounded-lg text-center">
                              <p className="text-xs text-muted-foreground">Max EMI</p>
                              <p className="font-semibold text-foreground">{formatCurrency(eligibility.maxEMI)}/mo</p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg text-center">
                              <p className="text-xs text-muted-foreground">Est. Rate</p>
                              <p className="font-semibold text-foreground">{eligibility.interestRate}% p.a.</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground">Notes:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {eligibility.reasons.map((reason, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button className="w-full" asChild>
                            <Link to="/compare">
                              Compare Offers
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <div className="p-6 bg-destructive/10 rounded-lg border border-destructive/20 text-center">
                          <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-3" />
                          <p className="text-lg font-semibold text-destructive mb-2">Low Eligibility</p>
                          <p className="text-sm text-muted-foreground">
                            Based on your current profile, loan eligibility is limited. Consider reducing existing EMIs or increasing income.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <UserCheck className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">
                        Fill in your details to see your eligibility
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mt-8">
              * This is an indicative eligibility. Actual loan amount and terms are subject to bank's 
              verification and approval process. Checking eligibility does not impact your credit score.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}