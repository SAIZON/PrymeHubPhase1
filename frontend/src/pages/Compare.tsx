import { useState, useEffect } from "react";
import { ExternalLink, CheckCircle, AlertCircle, Loader2, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Ensure this component exists
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getAllPublicLoans, PublicLoanProduct } from "@/service/public-loan";
import { getCurrentUser } from "@/service/auth";
import { AuthModal } from "@/components/auth/AuthModal";

// Helper for currency formatting
const formatCurrency = (value: string | number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === 'string') return value;

    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
    return `₹${value.toLocaleString("en-IN")}`;
};



// --- APPROVAL LOGIC EXPLAINED ---
// Currently, this logic checks the 'features' text.
// If the bank added "Instant Approval" or "Pre-approved" to the features list,
// we show "High Chance". Otherwise "Medium".
// In a future update, we will compare User CIBIL vs Loan minCibil.

function ApprovalBadge({ features }: { features: string[] }) {
    const isHigh = features.some(f =>
        f.toLowerCase().includes('instant') ||
        f.toLowerCase().includes('approval') ||
        f.toLowerCase().includes('paperless')
    );

    if (isHigh) {
        return (
            <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                <CheckCircle className="h-3 w-3 mr-1" />
                High Chance
            </Badge>
        );
    }
    return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            Medium Chance
        </Badge>
    );
}

function CIBILAdvisory() {
    return (
        <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 border-2 border-blue-200">
                        <span className="text-2xl font-bold text-blue-700">720</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Your Estimated CIBIL Score: Good</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                            Based on this score, we have calculated your approval chances below.
                        </p>
                    </div>
                    <Button variant="outline" size="sm" className="self-start">Get Full Report</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Compare() {
    const navigate = useNavigate();
    const [loans, setLoans] = useState<PublicLoanProduct[]>([]);
    const [loading, setLoading] = useState(true);

    // --- FILTER STATE ---
    const [selectedType, setSelectedType] = useState("All");

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await getAllPublicLoans();
                setLoans(response.data);
            } catch (error) {
                console.error("Failed to load loans", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    const handleApply = (offer: PublicLoanProduct) => {
        if (getCurrentUser()) {
            // Pass data to dashboard
            navigate("/dashboard", { state: { prefillProduct: offer } });
        }
        // AuthModal triggers automatically for logged out users
    };

    // --- FILTER LOGIC ---
    const loanTypes = ["All", ...Array.from(new Set(loans.map(l => l.loanType)))];
    const filteredLoans = selectedType === "All"
        ? loans
        : loans.filter(l => l.loanType === selectedType);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-background py-8 md:py-12">
            <div className="container">
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Compare Loan Offers</h1>
                    <p className="text-muted-foreground">Based on your profile, here are the best offers from top banks</p>
                </div>

                <CIBILAdvisory />

                {/* --- FILTERS --- */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold">Available Offers ({filteredLoans.length})</h2>

                    <Tabs defaultValue="All" onValueChange={setSelectedType} className="w-full sm:w-auto">
                        <TabsList>
                            {loanTypes.map(type => (
                                <TabsTrigger key={type} value={type}>{type}</TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block">
                    <Card className="shadow-sm border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">Bank</TableHead>
                                    <TableHead className="font-semibold">Max Loan Amount</TableHead>
                                    <TableHead className="font-semibold">Interest Rate</TableHead>
                                    <TableHead className="font-semibold">Processing Fee</TableHead>
                                    <TableHead className="font-semibold">Tenure</TableHead>
                                    <TableHead className="font-semibold">Approval Chance</TableHead>
                                    <TableHead className="font-semibold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLoans.length === 0 ? (
                                    <TableRow><TableCell colSpan={7} className="text-center py-8">No offers found for {selectedType}.</TableCell></TableRow>
                                ) : (
                                    filteredLoans.map((offer) => (
                                        <TableRow key={offer.id} className="hover:bg-muted/30">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {offer.bankLogoUrl ? (
                                                        <img src={offer.bankLogoUrl} alt={offer.bankName} className="w-10 h-10 object-contain" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                                                            {offer.bankName.substring(0,3)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <span className="font-medium block">{offer.bankName}</span>
                                                        <span className="text-xs text-muted-foreground">{offer.loanType}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{formatCurrency(offer.maxLoanAmount)}</TableCell>
                                            <TableCell>
                                                <span className="font-semibold text-primary">{offer.interestRate}</span>
                                                <span className="text-muted-foreground text-sm"> p.a.</span>
                                            </TableCell>
                                            <TableCell>{offer.processingFee}</TableCell>
                                            <TableCell className="font-medium">{offer.tenure}</TableCell>
                                            <TableCell><ApprovalBadge features={offer.features} /></TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 justify-end">
                                                    {getCurrentUser() ? (
                                                        <Button variant="default" size="sm" onClick={() => handleApply(offer)}>
                                                            Apply with PRYME
                                                        </Button>
                                                    ) : (
                                                        <div className="scale-90"><AuthModal /></div>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                {/* Mobile Cards (Also filtered) */}
                <div className="md:hidden space-y-4">
                    {filteredLoans.map((offer) => (
                        <Card key={offer.id} className="shadow-sm border">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {offer.bankLogoUrl && <img src={offer.bankLogoUrl} className="w-12 h-12 object-contain" />}
                                        <div>
                                            <h3 className="font-semibold text-foreground">{offer.bankName}</h3>
                                            <ApprovalBadge features={offer.features} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Max Amount</p>
                                        <p className="font-semibold">{formatCurrency(offer.maxLoanAmount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Interest Rate</p>
                                        <p className="font-semibold text-primary">{offer.interestRate}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Processing Fee</p>
                                        <p className="font-semibold">{offer.processingFee}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Tenure</p>
                                        <p className="font-semibold">{offer.tenure}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {getCurrentUser() ? (
                                        <Button className="w-full" onClick={() => navigate("/dashboard")}>Apply with PRYME</Button>
                                    ) : (
                                        <div className="w-full"><AuthModal /></div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}