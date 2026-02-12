import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  RefreshCw,
  CreditCard,
  CheckCircle,
  FileText,
  Clock,
  Shield,
  TrendingDown,
  Zap,
  Percent,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LoanType = "home-loans" | "personal-loans" | "business-loans" | "loan-transfer" | "credit-cards";

interface LoanConfig {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  features: { icon: React.ElementType; title: string; description: string }[];
  eligibility: string[];
  documents: string[];
  interestRange: string;
  maxAmount: string;
  tenure: string;
}

const loanConfigs: Record<LoanType, LoanConfig> = {
  "home-loans": {
    title: "Home Loans",
    subtitle: "Make Your Dream Home a Reality",
    description: "Get the best home loan rates from top banks with quick approval and minimal documentation.",
    icon: Home,
    features: [
      { icon: TrendingDown, title: "Low Interest Rates", description: "Starting from 8.25% p.a. with flexible options" },
      { icon: Zap, title: "Fast Approval", description: "Get approved within 48 hours of application" },
      { icon: Clock, title: "Flexible Tenure", description: "Repay over 5 to 30 years as per your comfort" },
      { icon: Shield, title: "No Hidden Charges", description: "Transparent processing with zero surprises" },
    ],
    eligibility: [
      "Indian citizen or NRI aged 21-65 years",
      "Minimum monthly income of ₹25,000",
      "Employed or self-employed with 2+ years experience",
      "Good credit score (650+)",
      "Property must be approved by lending institution",
    ],
    documents: ["PAN Card & Aadhaar Card", "Latest 3 months salary slips", "Last 6 months bank statements", "Form 16 / ITR (2 years)", "Property documents"],
    interestRange: "8.25% - 10.5%",
    maxAmount: "₹5 Crore",
    tenure: "Up to 30 Years",
  },
  "personal-loans": {
    title: "Personal Loans",
    subtitle: "Quick Funds for Your Needs",
    description: "Instant personal loans with minimal documentation. Use for any purpose - wedding, travel, medical, or more.",
    icon: User,
    features: [
      { icon: Zap, title: "Instant Disbursal", description: "Get funds in your account within 24 hours" },
      { icon: FileText, title: "Minimal Documentation", description: "Just 3 documents needed for approval" },
      { icon: Percent, title: "Competitive Rates", description: "Interest rates starting from 10.5% p.a." },
      { icon: Shield, title: "No Collateral", description: "Unsecured loans - no assets required" },
    ],
    eligibility: [
      "Indian citizen aged 21-58 years",
      "Minimum monthly income of ₹20,000",
      "Salaried with 1+ year work experience",
      "Credit score of 700+",
      "Working in a recognized company",
    ],
    documents: ["PAN Card & Aadhaar Card", "Latest 2 months salary slips", "Last 3 months bank statements", "Employment ID proof"],
    interestRange: "10.5% - 18%",
    maxAmount: "₹40 Lakhs",
    tenure: "Up to 5 Years",
  },
  "business-loans": {
    title: "Business Loans",
    subtitle: "Fuel Your Business Growth",
    description: "Expand your business with flexible loans designed for entrepreneurs and SMEs.",
    icon: Briefcase,
    features: [
      { icon: TrendingDown, title: "Competitive Rates", description: "Special rates for established businesses" },
      { icon: Clock, title: "Quick Processing", description: "Approval within 5 working days" },
      { icon: Zap, title: "High Loan Amount", description: "Get up to ₹5 Crore for expansion" },
      { icon: Shield, title: "Flexible Security", description: "Both secured and unsecured options" },
    ],
    eligibility: [
      "Business operational for 3+ years",
      "Annual turnover of ₹50 Lakhs+",
      "Profitable for last 2 years",
      "Good credit history",
      "Valid business registration",
    ],
    documents: ["Business registration documents", "GST returns (2 years)", "ITR (3 years)", "Bank statements (12 months)", "Financial statements (audited)"],
    interestRange: "12% - 24%",
    maxAmount: "₹5 Crore",
    tenure: "Up to 7 Years",
  },
  "loan-transfer": {
    title: "Loan Transfer",
    subtitle: "Switch to Better Rates",
    description: "Transfer your existing loan to get lower interest rates and reduce your EMI burden.",
    icon: RefreshCw,
    features: [
      { icon: TrendingDown, title: "Lower EMIs", description: "Save up to 20% on your monthly payments" },
      { icon: Percent, title: "Better Rates", description: "Get rates up to 1% lower than current" },
      { icon: Zap, title: "Top-up Option", description: "Get additional funds with your transfer" },
      { icon: Shield, title: "Zero Hassle", description: "We handle all paperwork for you" },
    ],
    eligibility: [
      "Existing loan with another lender",
      "Good repayment track record (12+ months)",
      "Credit score of 700+",
      "Remaining tenure of 5+ years",
      "No defaults in last 12 months",
    ],
    documents: ["Existing loan statement", "Sanction letter of current loan", "Last 6 months bank statements", "Property documents (for home loans)", "KYC documents"],
    interestRange: "8.25% - 12%",
    maxAmount: "Based on existing loan",
    tenure: "Remaining tenure",
  },
  "credit-cards": {
    title: "Credit Cards",
    subtitle: "Smart Spending, Great Rewards",
    description: "Compare and apply for the best credit cards with exclusive rewards, cashback, and travel benefits.",
    icon: CreditCard,
    features: [
      { icon: Percent, title: "Cashback Rewards", description: "Earn up to 5% cashback on all spends" },
      { icon: Zap, title: "Instant Approval", description: "Get approved in just 2 minutes" },
      { icon: Shield, title: "Zero Annual Fee", description: "Many cards with lifetime free option" },
      { icon: TrendingDown, title: "Low Interest", description: "Competitive rates on revolving credit" },
    ],
    eligibility: [
      "Indian citizen aged 21-60 years",
      "Minimum monthly income of ₹15,000",
      "Salaried or self-employed",
      "Good credit score (700+)",
      "Valid address proof",
    ],
    documents: ["PAN Card & Aadhaar Card", "Latest salary slip", "Last 3 months bank statements", "Passport size photograph"],
    interestRange: "2.5% - 3.5% per month",
    maxAmount: "Up to ₹10 Lakhs",
    tenure: "Revolving Credit",
  },
};

export default function LoanProduct() {
  const location = useLocation();
  // Extract loan type from path, e.g., "/home-loans" -> "home-loans"
  const pathSegment = location.pathname.slice(1) as LoanType;
  const loanType = loanConfigs[pathSegment] ? pathSegment : "home-loans";
  const config = loanConfigs[loanType];
  const Icon = config.icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {config.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              {config.subtitle}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {config.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/compare">
                  Compare Offers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/calculators">Use Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold">{config.interestRange}</p>
              <p className="text-sm opacity-90">Interest Rate</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">{config.maxAmount}</p>
              <p className="text-sm opacity-90">Max Amount</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">{config.tenure}</p>
              <p className="text-sm opacity-90">Tenure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose PRYME?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring you the best offers from top banks with unmatched service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {config.features.map((feature, index) => (
              <Card key={index} className="shadow-card border-border/50 hover:shadow-card-hover transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Eligibility */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {config.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-5 w-5 text-primary" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {config.documents.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <Card className="max-w-4xl mx-auto bg-primary text-primary-foreground shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Compare offers from multiple banks and find the best {config.title.toLowerCase()} for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link to="/signup">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/compare">View All Offers</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
