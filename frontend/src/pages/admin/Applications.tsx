import { useState, useEffect } from "react";
import { Eye, Search, Clock, RefreshCw, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
// Ensure you have created this service file as discussed
import { leadService, Lead } from "@/service/lead";

export default function Applications() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // 1. Fetch Real Data on Load
    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        setIsLoading(true);
        try {
            const data = await leadService.getLeads();
            // The backend returns a Page object, so we access .content
            setLeads(data.content || []);
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Filter Logic (Frontend Side)
    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.name?.toLowerCase().includes(search.toLowerCase()) ||
            lead.email?.toLowerCase().includes(search.toLowerCase()) ||
            lead.loanType?.toLowerCase().includes(search.toLowerCase()) ||
            String(lead.id).includes(search);

        const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric"
        });
    };

    // Stats Calculation based on real data
    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === "NEW").length,
        // Add other statuses as your backend logic expands
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Leads & Inquiries</h1>
                    <p className="text-muted-foreground">Manage incoming loan requests</p>
                </div>
                <Button onClick={loadLeads} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Data
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="shadow-card border-border/50">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                        <p className="text-xs text-muted-foreground">Total Leads</p>
                    </CardContent>
                </Card>
                <Card className="shadow-card border-border/50">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{stats.new}</p>
                        <p className="text-xs text-muted-foreground">New Inquiries</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="NEW">New</SelectItem>
                        <SelectItem value="CONTACTED">Contacted</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Data Table */}
            <Card className="shadow-card border-border/50">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead>ID</TableHead>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Loan Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">Loading leads...</TableCell>
                                </TableRow>
                            ) : filteredLeads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                        No leads found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell className="font-mono text-sm text-muted-foreground">#{lead.id}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{lead.name}</p>
                                                <p className="text-xs text-muted-foreground">{lead.email}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{lead.loanType}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={lead.status === 'NEW' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 'bg-gray-100 text-gray-800 hover:bg-gray-100'}>
                                                {lead.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{formatDate(lead.createdAt)}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end">
                                                <Sheet>
                                                    <SheetTrigger asChild>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            Details
                                                        </Button>
                                                    </SheetTrigger>
                                                    <SheetContent className="w-full sm:max-w-md">
                                                        <SheetHeader>
                                                            <SheetTitle>Lead Details</SheetTitle>
                                                        </SheetHeader>
                                                        <div className="mt-6 space-y-6">

                                                            {/* Applicant Details */}
                                                            <div className="space-y-4">
                                                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                                                    <User className="h-4 w-4" /> Applicant Info
                                                                </h3>
                                                                <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-lg">
                                                                    <div>
                                                                        <p className="text-muted-foreground text-xs uppercase">Full Name</p>
                                                                        <p className="font-medium">{lead.name}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-muted-foreground text-xs uppercase">Loan Type</p>
                                                                        <p className="font-medium">{lead.loanType}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-muted-foreground text-xs uppercase">Email</p>
                                                                        <p className="font-medium">{lead.email}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-muted-foreground text-xs uppercase">Phone</p>
                                                                        <p className="font-medium">{lead.mobile}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Inquiry Message */}
                                                            <div className="space-y-2">
                                                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                                                    <Mail className="h-4 w-4" /> Inquiry Message
                                                                </h3>
                                                                <div className="bg-muted p-4 rounded-lg text-sm leading-relaxed">
                                                                    {lead.message ? lead.message : (
                                                                        <span className="text-muted-foreground italic">No message provided.</span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Timestamps */}
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t">
                                                                <Clock className="h-3 w-3" />
                                                                <span>Submitted on {new Date(lead.createdAt).toLocaleString()}</span>
                                                            </div>

                                                        </div>
                                                    </SheetContent>
                                                </Sheet>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}