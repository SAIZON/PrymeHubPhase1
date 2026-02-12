import { 
  FileSearch, 
  FileCheck, 
  PieChart, 
  Users, 
  Shield, 
  Headphones,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: FileSearch,
    title: "Loan Consultation",
    description: "Get personalized advice from our financial experts to find the best loan product suited to your needs and financial goals.",
    features: ["One-on-one expert sessions", "Customized loan recommendations", "Interest rate negotiation tips"],
  },
  {
    icon: FileCheck,
    title: "Document Assistance",
    description: "We help you prepare and organize all required documents for a smooth and hassle-free loan application process.",
    features: ["Document checklist preparation", "Verification support", "Error-free submission"],
  },
  {
    icon: PieChart,
    title: "Portfolio Analysis",
    description: "Comprehensive analysis of your existing loans and debts to optimize your financial portfolio and reduce EMI burden.",
    features: ["Debt consolidation advice", "Prepayment strategies", "Balance transfer opportunities"],
  },
  {
    icon: Users,
    title: "Bank Liaison",
    description: "We act as your representative with banks, ensuring faster processing and better communication throughout the loan journey.",
    features: ["Direct bank coordination", "Status tracking", "Query resolution"],
  },
  {
    icon: Shield,
    title: "Credit Score Improvement",
    description: "Expert guidance to improve your CIBIL score and increase your chances of loan approval at better interest rates.",
    features: ["Score analysis", "Improvement roadmap", "Ongoing monitoring"],
  },
  {
    icon: Headphones,
    title: "Post-Disbursement Support",
    description: "Our support doesn't end at disbursement. We assist with EMI management, prepayment planning, and refinancing options.",
    features: ["EMI reminders", "Prepayment guidance", "Refinancing assistance"],
  },
];

const processSteps = [
  { step: 1, title: "Initial Consultation", description: "Share your requirements and financial goals" },
  { step: 2, title: "Document Collection", description: "We help gather and verify all necessary documents" },
  { step: 3, title: "Bank Matching", description: "Get matched with the best banks for your profile" },
  { step: 4, title: "Application Processing", description: "We handle the entire application process" },
  { step: 5, title: "Loan Disbursement", description: "Receive your loan with best possible terms" },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive financial services to guide you through every step of your loan journey
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">
              Get Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="shadow-card border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures you get the best loan with minimum hassle
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              
              <div className="space-y-8">
                {processSteps.map((item, index) => (
                  <div key={index} className="flex gap-4 md:gap-6">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                Let our experts help you find the perfect loan solution. Schedule a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link to="/calculators">Try Our Calculators</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
