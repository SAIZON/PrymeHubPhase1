import { Building2, Shield, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const partnerBanks = [
  { name: "HDFC Bank", logo: "H", color: "bg-red-600" },
  { name: "State Bank of India", logo: "SBI", color: "bg-blue-700" },
  { name: "ICICI Bank", logo: "I", color: "bg-orange-600" },
  { name: "Axis Bank", logo: "A", color: "bg-purple-700" },
  { name: "Kotak Mahindra", logo: "K", color: "bg-red-500" },
  { name: "Bank of Baroda", logo: "BoB", color: "bg-orange-500" },
  { name: "Punjab National Bank", logo: "PNB", color: "bg-blue-600" },
  { name: "Yes Bank", logo: "Y", color: "bg-blue-500" },
  { name: "IndusInd Bank", logo: "IB", color: "bg-teal-600" },
  { name: "IDFC First Bank", logo: "ID", color: "bg-red-700" },
  { name: "Federal Bank", logo: "F", color: "bg-yellow-600" },
  { name: "Bajaj Finserv", logo: "BF", color: "bg-blue-800" },
];

const stats = [
  { icon: Building2, value: "25+", label: "Partner Banks" },
  { icon: Users, value: "50,000+", label: "Happy Customers" },
  { icon: TrendingUp, value: "₹500 Cr+", label: "Loans Disbursed" },
  { icon: Shield, value: "100%", label: "Secure Process" },
];

export default function Partners() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Banking Partners
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've partnered with India's leading banks and financial institutions to bring 
            you the best loan offers with competitive rates and quick approvals.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 opacity-90" />
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Top Financial Institutions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Compare offers from these leading banks and choose the one that fits you best
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {partnerBanks.map((bank, index) => (
              <Card 
                key={index} 
                className="shadow-card border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className={`w-16 h-16 ${bank.color} rounded-xl flex items-center justify-center mb-3`}>
                    <span className="text-white font-bold text-lg">{bank.logo}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground text-center">{bank.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Banks Partner With Us
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-card border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Quality Leads</h3>
                  <p className="text-sm text-muted-foreground">
                    Pre-verified customers with genuine loan requirements and strong credit profiles
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Higher Conversion</h3>
                  <p className="text-sm text-muted-foreground">
                    Our matching algorithm ensures higher application-to-disbursal conversion rates
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Compliant Process</h3>
                  <p className="text-sm text-muted-foreground">
                    RBI-compliant documentation and secure data handling for all applications
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <Card className="max-w-4xl mx-auto bg-primary text-primary-foreground shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Become a Partner
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
                Are you a bank or NBFC looking to expand your customer base? Partner with PRYME 
                and access thousands of pre-qualified loan seekers.
              </p>
              <p className="text-sm opacity-80">
                Contact us at <span className="font-semibold">partners@pryme.in</span> to get started
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}