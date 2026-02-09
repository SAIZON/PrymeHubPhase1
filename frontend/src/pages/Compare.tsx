import { useState } from "react";
import { ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const loanOffers = [
  {
    id: 1,
    bank: "HDFC Bank",
    logo: "HDFC",
    maxAmount: 10000000,
    roi: 8.5,
    processingFee: "0.5%",
    emi: 77823,
    approval: "high",
  },
  {
    id: 2,
    bank: "SBI",
    logo: "SBI",
    maxAmount: 15000000,
    roi: 8.25,
    processingFee: "0.35%",
    emi: 76234,
    approval: "high",
  },
  {
    id: 3,
    bank: "ICICI Bank",
    logo: "ICICI",
    maxAmount: 12000000,
    roi: 8.75,
    processingFee: "0.5%",
    emi: 79445,
    approval: "medium",
  },
  {
    id: 4,
    bank: "Axis Bank",
    logo: "AXIS",
    maxAmount: 8000000,
    roi: 9.0,
    processingFee: "1%",
    emi: 81087,
    approval: "high",
  },
  {
    id: 5,
    bank: "Kotak Mahindra",
    logo: "KOTAK",
    maxAmount: 10000000,
    roi: 8.65,
    processingFee: "0.5%",
    emi: 78654,
    approval: "medium",
  },
];

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(0)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
};

function ApprovalBadge({ level }: { level: string }) {
  if (level === "high") {
    return (
      <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">
        <CheckCircle className="h-3 w-3 mr-1" />
        High Chance
      </Badge>
    );
  }
  return (
    <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/10">
      <AlertCircle className="h-3 w-3 mr-1" />
      Medium Chance
    </Badge>
  );
}

function CIBILAdvisory() {
  return (
    <Card className="mb-8 border-accent/30 bg-accent/5">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-accent-foreground">720</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Your CIBIL Score: Good
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              You're eligible for most loans. Here's how to improve your score:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Pay off credit card debt to reach 750+ for better rates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Maintain credit utilization below 30%
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                Avoid multiple loan inquiries in short period
              </li>
            </ul>
          </div>
          <Button variant="outline" size="sm" className="self-start">
            Get Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Compare() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Compare Loan Offers
          </h1>
          <p className="text-muted-foreground">
            Based on your profile, here are the best offers from top banks
          </p>
        </div>

        {/* CIBIL Advisory Section */}
        <CIBILAdvisory />

        {/* Desktop Table */}
        <div className="hidden md:block">
          <Card className="shadow-card border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Bank</TableHead>
                  <TableHead className="font-semibold">Max Loan Amount</TableHead>
                  <TableHead className="font-semibold">Interest Rate</TableHead>
                  <TableHead className="font-semibold">Processing Fee</TableHead>
                  <TableHead className="font-semibold">Est. EMI</TableHead>
                  <TableHead className="font-semibold">Approval</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanOffers.map((offer) => (
                  <TableRow key={offer.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{offer.logo}</span>
                        </div>
                        <span className="font-medium">{offer.bank}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(offer.maxAmount)}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{offer.roi}%</span>
                      <span className="text-muted-foreground text-sm"> p.a.</span>
                    </TableCell>
                    <TableCell>{offer.processingFee}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(offer.emi)}/mo
                    </TableCell>
                    <TableCell>
                      <ApprovalBadge level={offer.approval} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Bank
                        </Button>
                        <Button variant="default" size="sm" asChild>
                          <Link to="/signup">Apply with PRYME</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {loanOffers.map((offer) => (
            <Card key={offer.id} className="shadow-card border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{offer.logo}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{offer.bank}</h3>
                      <ApprovalBadge level={offer.approval} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Max Amount</p>
                    <p className="font-semibold">{formatCurrency(offer.maxAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Interest Rate</p>
                    <p className="font-semibold text-primary">{offer.roi}% p.a.</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Processing Fee</p>
                    <p className="font-semibold">{offer.processingFee}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Est. EMI</p>
                    <p className="font-semibold">{formatCurrency(offer.emi)}/mo</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Bank
                  </Button>
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <Link to="/signup">Apply with PRYME</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
