import { Gift, Tag, Clock, Copy, CheckCircle, Percent, Sparkles } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const offers = [
  {
    id: 1,
    title: "₹500 Cashback on HDFC Home Loans",
    description: "Get instant cashback when you apply for HDFC Home Loan through PRYME",
    code: "HDFC500",
    discount: "₹500",
    validTill: "Feb 28, 2025",
    category: "Cashback",
    bank: "HDFC",
    featured: true,
  },
  {
    id: 2,
    title: "Zero Processing Fee",
    description: "Apply with code and get 100% processing fee waiver on SBI Personal Loans",
    code: "PRYME2025",
    discount: "100% Off",
    validTill: "Mar 15, 2025",
    category: "Processing Fee",
    bank: "SBI",
    featured: true,
  },
  {
    id: 3,
    title: "₹1000 Amazon Voucher",
    description: "Get Amazon gift card on successful disbursement of ICICI Business Loan",
    code: "ICICI1K",
    discount: "₹1000",
    validTill: "Feb 20, 2025",
    category: "Gift Voucher",
    bank: "ICICI",
    featured: false,
  },
  {
    id: 4,
    title: "0.25% Rate Discount",
    description: "Special interest rate reduction on Axis Bank Home Loans for PRYME users",
    code: "AXISRATE",
    discount: "0.25%",
    validTill: "Mar 31, 2025",
    category: "Interest Rate",
    bank: "Axis",
    featured: false,
  },
  {
    id: 5,
    title: "₹750 Paytm Cashback",
    description: "Instant Paytm cashback on Kotak Personal Loan disbursement",
    code: "KOTAK750",
    discount: "₹750",
    validTill: "Feb 25, 2025",
    category: "Cashback",
    bank: "Kotak",
    featured: false,
  },
  {
    id: 6,
    title: "Free Credit Report",
    description: "Get your detailed CIBIL report free when you check eligibility",
    code: "FREECIBIL",
    discount: "Free",
    validTill: "Ongoing",
    category: "Free Service",
    bank: "All Banks",
    featured: false,
  },
];

function OfferCard({ offer }: { offer: typeof offers[0] }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card 
      className={`shadow-card border-border/50 hover:shadow-card-hover transition-all duration-300 overflow-hidden ${
        offer.featured ? "ring-2 ring-accent" : ""
      }`}
    >
      {offer.featured && (
        <div className="bg-accent text-accent-foreground px-4 py-1.5 text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Featured Offer
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              {offer.bank}
            </Badge>
            <CardTitle className="text-lg leading-snug">
              {offer.title}
            </CardTitle>
          </div>
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Gift className="h-6 w-6 text-accent-foreground" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {offer.description}
        </p>

        {/* Discount Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
            <Percent className="h-4 w-4 text-accent-foreground" />
            <span className="font-bold text-accent-foreground">{offer.discount}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {offer.category}
          </Badge>
        </div>

        {/* Code Section */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-dashed border-accent">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <code className="font-mono font-semibold text-foreground tracking-wider">
              {offer.code}
            </code>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyCode}
            className={copied ? "text-success border-success" : ""}
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* Validity */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          Valid till: {offer.validTill}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PublicOffers() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-accent/10 py-16 md:py-20 border-b border-accent/20">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground mb-6">
            <Gift className="h-5 w-5" />
            <span className="font-medium">Exclusive Offers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Special Deals & Discounts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock exclusive cashback, fee waivers, and special rates when you apply through PRYME
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Featured Offers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              Featured Offers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {offers.filter(o => o.featured).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>

          {/* All Offers */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              All Offers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.filter(o => !o.featured).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">Terms & Conditions</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Offers are subject to bank approval and eligibility criteria</li>
                <li>• Cashback will be credited within 30 days of loan disbursement</li>
                <li>• Offer codes must be applied at the time of application</li>
                <li>• PRYME reserves the right to modify or withdraw offers without prior notice</li>
                <li>• Only one offer code can be applied per loan application</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
