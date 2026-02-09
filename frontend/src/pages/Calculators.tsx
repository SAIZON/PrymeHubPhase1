import { useState, useMemo } from "react";
import { Calculator, TrendingDown, UserCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

function formatCurrency(value: number) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}

function EMICalculatorTab() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const calculations = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal,
    };
  }, [loanAmount, tenure, interestRate]);

  const chartData = [
    { name: "Principal", value: calculations.principal, color: "hsl(147, 60%, 42%)" },
    { name: "Interest", value: calculations.totalInterest, color: "hsl(147, 40%, 75%)" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Adjust Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Loan Amount</label>
              <span className="text-lg font-bold text-primary">{formatCurrency(loanAmount)}</span>
            </div>
            <Slider
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
              min={100000}
              max={50000000}
              step={100000}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹1 L</span>
              <span>₹5 Cr</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Tenure (Years)</label>
              <span className="text-lg font-bold text-primary">{tenure} Years</span>
            </div>
            <Slider
              value={[tenure]}
              onValueChange={(value) => setTenure(value[0])}
              min={1}
              max={30}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Interest Rate (%)</label>
              <span className="text-lg font-bold text-primary">{interestRate}%</span>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              min={5}
              max={20}
              step={0.1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Your EMI Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">Monthly EMI</span>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(calculations.emi)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                <p className="font-semibold text-foreground">
                  {formatCurrency(calculations.totalInterest)}
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
                <p className="font-semibold text-foreground">
                  {formatCurrency(calculations.totalPayment)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PrepaymentCalculatorTab() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [enable13thEMI, setEnable13thEMI] = useState(true);
  const [enableEMIIncrease, setEnableEMIIncrease] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    // Regular EMI calculation
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const regularTotal = emi * months;
    const regularInterest = regularTotal - principal;

    // Calculate savings based on selected options
    let interestSaved = 0;
    let monthsSaved = 0;

    if (enable13thEMI) {
      // 13th EMI saves approximately 15-18% interest and 3-4 years
      interestSaved += regularInterest * 0.16;
      monthsSaved += Math.round(tenure * 12 * 0.15);
    }

    if (enableEMIIncrease) {
      // 5% yearly increase saves approximately 20-25% interest and 5-6 years
      interestSaved += regularInterest * 0.22;
      monthsSaved += Math.round(tenure * 12 * 0.20);
    }

    // Cap the maximum savings
    interestSaved = Math.min(interestSaved, regularInterest * 0.45);
    monthsSaved = Math.min(monthsSaved, months - 24);

    const savedYears = Math.floor(monthsSaved / 12);
    const savedMonthsRemainder = monthsSaved % 12;

    return {
      regularEMI: Math.round(emi),
      regularInterest: Math.round(regularInterest),
      interestSaved: Math.round(interestSaved),
      tenureReduced: { years: savedYears, months: savedMonthsRemainder },
      newTotalInterest: Math.round(regularInterest - interestSaved),
      newTenureMonths: months - monthsSaved,
      yearlyExtraPayment: enable13thEMI ? Math.round(emi) : 0,
      firstYearEMI: Math.round(emi),
      lastYearEMI: enableEMIIncrease ? Math.round(emi * Math.pow(1.05, tenure - 1)) : Math.round(emi),
    };
  }, [loanAmount, tenure, interestRate, enable13thEMI, enableEMIIncrease]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Loan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prepay-amount">Loan Amount (₹)</Label>
            <Input
              id="prepay-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              placeholder="5000000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prepay-tenure">Tenure (Years)</Label>
            <Input
              id="prepay-tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              placeholder="20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prepay-rate">Interest Rate (%)</Label>
            <Input
              id="prepay-rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              placeholder="8.5"
            />
          </div>

          {/* Prepayment Options */}
          <div className="space-y-4 pt-4 border-t border-border">
            <Label className="text-base font-semibold">Prepayment Strategies</Label>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <input
                type="checkbox"
                id="13th-emi"
                checked={enable13thEMI}
                onChange={(e) => setEnable13thEMI(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <label htmlFor="13th-emi" className="font-medium text-foreground cursor-pointer">
                  Pay 1 extra EMI per year (13th EMI)
                </label>
                <p className="text-sm text-muted-foreground mt-1">
                  Pay one additional EMI every year, typically from your annual bonus
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <input
                type="checkbox"
                id="emi-increase"
                checked={enableEMIIncrease}
                onChange={(e) => setEnableEMIIncrease(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <label htmlFor="emi-increase" className="font-medium text-foreground cursor-pointer">
                  Increase EMI by 5% every year
                </label>
                <p className="text-sm text-muted-foreground mt-1">
                  Align EMI increases with your salary growth to pay off faster
                </p>
              </div>
            </div>
          </div>

          <Button onClick={() => setCalculated(true)} className="w-full">
            Calculate Savings
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Prepayment Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          {calculated && (enable13thEMI || enableEMIIncrease) ? (
            <div className="space-y-6">
              <div className="p-6 bg-success/10 rounded-lg border border-success/20">
                <p className="text-sm text-muted-foreground mb-3">
                  With your selected strategies:
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Total Interest Saved</span>
                    <span className="text-2xl font-bold text-success">
                      {formatCurrency(results.interestSaved)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Tenure Reduced By</span>
                    <span className="text-2xl font-bold text-success">
                      {results.tenureReduced.years}Y {results.tenureReduced.months}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-success/20">
                    <span className="font-medium text-foreground">New Tenure</span>
                    <span className="text-lg font-semibold text-foreground">
                      {Math.floor(results.newTenureMonths / 12)}Y {results.newTenureMonths % 12}M
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Regular EMI</p>
                  <p className="font-semibold text-foreground">{formatCurrency(results.regularEMI)}</p>
                </div>
                {enable13thEMI && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Extra/Year (13th EMI)</p>
                    <p className="font-semibold text-foreground">{formatCurrency(results.yearlyExtraPayment)}</p>
                  </div>
                )}
                {enableEMIIncrease && (
                  <>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Year 1 EMI</p>
                      <p className="font-semibold text-foreground">{formatCurrency(results.firstYearEMI)}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Final Year EMI</p>
                      <p className="font-semibold text-foreground">{formatCurrency(results.lastYearEMI)}</p>
                    </div>
                  </>
                )}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Original Interest</p>
                  <p className="font-semibold text-foreground">{formatCurrency(results.regularInterest)}</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">New Total Interest</p>
                  <p className="font-semibold text-primary">{formatCurrency(results.newTotalInterest)}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                * Calculations are approximate. Actual savings may vary based on bank terms.
              </p>
            </div>
          ) : calculated ? (
            <div className="h-full flex items-center justify-center py-12">
              <div className="text-center">
                <TrendingDown className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Select at least one prepayment strategy</p>
                <p className="text-sm text-muted-foreground">to see your potential savings</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center py-12">
              <div className="text-center">
                <TrendingDown className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Enter your loan details and select strategies</p>
                <p className="text-sm text-muted-foreground">to see your prepayment savings</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EligibilityCalculatorTab() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [occupation, setOccupation] = useState("");
  const [existingEMIs, setExistingEMIs] = useState("");
  const [calculated, setCalculated] = useState(false);

  const eligibility = useMemo(() => {
    const income = Number(monthlyIncome) || 0;
    const emis = Number(existingEMIs) || 0;

    // FOIR (Fixed Obligation to Income Ratio) calculation
    const maxFOIR = occupation === "salaried" ? 0.5 : occupation === "self-employed" ? 0.4 : 0.45;
    const availableForEMI = (income * maxFOIR) - emis;

    if (availableForEMI <= 0) {
      return { eligible: false, maxAmount: 0, maxEMI: 0 };
    }

    // Assuming 8.5% interest rate and 20 year tenure for max calculation
    const monthlyRate = 8.5 / 12 / 100;
    const months = 20 * 12;

    const maxLoanAmount =
      (availableForEMI * (Math.pow(1 + monthlyRate, months) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, months));

    return {
      eligible: maxLoanAmount > 100000,
      maxAmount: Math.round(maxLoanAmount),
      maxEMI: Math.round(availableForEMI),
    };
  }, [monthlyIncome, occupation, existingEMIs]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Your Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="income">Monthly Income (₹)</Label>
            <Input
              id="income"
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="e.g., 75000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Select value={occupation} onValueChange={setOccupation}>
              <SelectTrigger id="occupation">
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salaried">Salaried</SelectItem>
                <SelectItem value="self-employed">Self-Employed</SelectItem>
                <SelectItem value="professional">Professional (Doctor, CA, etc.)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="existing-emi">Existing EMIs (₹/month)</Label>
            <Input
              id="existing-emi"
              type="number"
              value={existingEMIs}
              onChange={(e) => setExistingEMIs(e.target.value)}
              placeholder="e.g., 15000"
            />
          </div>
          <Button onClick={() => setCalculated(true)} className="w-full">
            Check Eligibility
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Your Eligibility</CardTitle>
        </CardHeader>
        <CardContent>
          {calculated && monthlyIncome && occupation ? (
            <div className="space-y-6">
              {eligibility.eligible ? (
                <>
                  <div className="p-6 bg-success/10 rounded-lg border border-success/20 text-center">
                    <UserCheck className="h-12 w-12 mx-auto text-success mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">You are eligible for up to</p>
                    <p className="text-3xl font-bold text-success">
                      {formatCurrency(eligibility.maxAmount)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Max EMI Capacity</p>
                      <p className="font-semibold text-foreground">{formatCurrency(eligibility.maxEMI)}/mo</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Assumed Tenure</p>
                      <p className="font-semibold text-foreground">20 Years</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    * Based on 8.5% interest rate. Actual eligibility may vary based on bank policies.
                  </p>
                </>
              ) : (
                <div className="p-6 bg-destructive/10 rounded-lg border border-destructive/20 text-center">
                  <p className="text-lg font-semibold text-destructive mb-2">Low Eligibility</p>
                  <p className="text-sm text-muted-foreground">
                    Based on your current income and existing EMIs, your loan eligibility is limited. Consider reducing existing obligations or increasing income.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center py-12">
              <div className="text-center">
                <UserCheck className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Enter your details and click Check Eligibility</p>
                <p className="text-sm text-muted-foreground">to see your loan eligibility</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Calculators() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
              <Calculator className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Financial Calculators
            </h1>
            <p className="text-lg text-muted-foreground">
              Plan your loans with our suite of powerful calculators
            </p>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="py-12 md:py-16">
        <div className="container max-w-6xl">
          <Tabs defaultValue="emi" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto h-auto p-1">
              <TabsTrigger value="emi" className="py-3">
                <Calculator className="h-4 w-4 mr-2" />
                EMI Calculator
              </TabsTrigger>
              <TabsTrigger value="prepayment" className="py-3">
                <TrendingDown className="h-4 w-4 mr-2" />
                Prepayment
              </TabsTrigger>
              <TabsTrigger value="eligibility" className="py-3">
                <UserCheck className="h-4 w-4 mr-2" />
                Eligibility
              </TabsTrigger>
            </TabsList>

            <TabsContent value="emi">
              <EMICalculatorTab />
            </TabsContent>

            <TabsContent value="prepayment">
              <PrepaymentCalculatorTab />
            </TabsContent>

            <TabsContent value="eligibility">
              <EligibilityCalculatorTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
