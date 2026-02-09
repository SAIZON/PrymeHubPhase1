import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, text: "100% Secure" },
  { icon: Clock, text: "Quick Approval" },
  { icon: CheckCircle, text: "Best Rates" },
];

export function HeroSection() {
  return (
    <section className="gradient-hero py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm font-medium text-accent-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Trusted by 50,000+ customers
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Find Your Perfect{" "}
            <span className="text-primary">Loan Match</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compare offers from top banks instantly. Get the best rates, lowest EMIs, and fastest approvals with PRYME.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" asChild>
              <Link to="/compare">
                Compare Loans Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/calculators">
                Check Eligibility
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center gap-2 text-muted-foreground">
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
