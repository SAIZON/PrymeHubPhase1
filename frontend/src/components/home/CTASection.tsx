import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Compare 50+ banks instantly",
  "Get personalized offers",
  "No hidden charges",
  "Expert support team",
];

export function CTASection() {
  return (
    <section className="py-16 md:py-24 gradient-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Loan?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who saved money and time with PRYME. Start comparing now!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-sm"
              >
                <CheckCircle className="h-4 w-4" />
                {benefit}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-lg"
              asChild
            >
              <Link to="/compare">
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold"
              asChild
            >
              <Link to="/contact">Talk to Expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
