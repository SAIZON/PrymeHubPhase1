import {
  Target,
  Users,
  Shield,
  Award,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in complete transparency with no hidden fees or surprises. What you see is what you get.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your financial wellbeing is our priority. We work tirelessly to get you the best possible deals.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We partner only with top-rated banks and NBFCs to ensure you get premium service and rates.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Leveraging technology to simplify the loan process and deliver instant, accurate comparisons.",
  },
];

const stats = [
  { value: "₹500+ Cr", label: "Loans Facilitated" },
  { value: "50,000+", label: "Happy Customers" },
  { value: "25+", label: "Banking Partners" },
  { value: "4.8/5", label: "Customer Rating" },
];

const whyChoose = [
  "Compare rates from 25+ top banks instantly",
  "100% free service - we never charge you",
  "Expert advisors available 7 days a week",
  "Fastest loan processing with minimal documentation",
  "Secure and confidential handling of your data",
  "Track your application status in real-time",
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About PRYME
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to simplify the loan discovery process and help millions of Indians find the perfect financial solutions for their needs.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  At PRYME, we believe everyone deserves access to the best financial products without the hassle of visiting multiple banks or dealing with complex paperwork.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our platform aggregates offers from India's top banks and financial institutions, allowing you to compare interest rates, processing fees, and eligibility criteria in one place. We're committed to making the loan discovery process transparent, efficient, and stress-free.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <Card key={index} className="shadow-card border-border/50">
                    <CardContent className="p-5 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                        <value.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{value.title}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose PRYME */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose PRYME?</h2>
              <p className="text-lg text-muted-foreground">
                Here's what sets us apart from traditional loan processes
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {whyChoose.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card border border-border/50"
                >
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="shadow-card border-border/50 hover:shadow-card-hover transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-lg text-muted-foreground">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="shadow-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Office Address</h3>
                        <p className="text-sm text-muted-foreground">
                          123 Financial District<br />
                          Bandra Kurla Complex<br />
                          Mumbai, Maharashtra 400051
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                        <p className="text-sm text-muted-foreground">
                          support@pryme.in<br />
                          partners@pryme.in
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                        <p className="text-sm text-muted-foreground">
                          +91 1800-123-4567<br />
                          Mon-Sat: 9AM - 8PM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="lg:col-span-2 shadow-card border-border/50">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your query..."
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
