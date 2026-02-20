import { useState, useEffect } from "react";
import { Search, RefreshCw, FileText, Eye, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { adminApplicationService, Application } from "@/service/admin-application";
import { useToast } from "@/hooks/use-toast"; // Assuming you have a toast hook

export default function UserApplications() {
    const [apps, setApps] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [newStatus, setNewStatus] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState(false);
    const { toast } = useToast();

    const loadApps = async () => {
        setIsLoading(true);
        try {
            const data = await adminApplicationService.getAllApplications();
            setApps(data.content || []);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadApps();
    }, []);

    const handleView = (app: Application) => {
        setSelectedApp(app);
        setNewStatus(app.status);
    };

    const handleStatusUpdate = async () => {
        if (!selectedApp || !newStatus) return;

        setIsUpdating(true);
        try {
            const updatedApp = await adminApplicationService.updateApplicationStatus(selectedApp.id, newStatus);

            // Update local state
            setApps(apps.map(a => a.id === updatedApp.id ? updatedApp : a));
            setSelectedApp(updatedApp);

            toast({
                title: "Status Updated",
                description: `Application #${updatedApp.id} is now ${updatedApp.status}`,
            });
            // Optional: Close dialog on success
            // setSelectedApp(null);
        } catch (error) {
            console.error(error);
            toast({
                title: "Update Failed",
                description: "Could not update application status.",
                variant: "destructive"
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const filteredApps = apps.filter((app) =>
        app.loanType?.toLowerCase().includes(search.toLowerCase()) ||
        app.bankName?.toLowerCase().includes(search.toLowerCase()) ||
        app.user?.email?.toLowerCase().includes(search.toLowerCase())
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
            case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
            case 'DISBURSED': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">User Applications</h1>
                    <p className="text-muted-foreground">Formal loan applications from Dashboard</p>
                </div>
                <Button onClick={loadApps} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search email, bank, or type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Table */}
            <Card className="shadow-card border-border/50">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead>ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24">Loading...</TableCell>
                                </TableRow>
                            ) : filteredApps.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                        No applications found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredApps.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell className="font-mono text-xs">#{app.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{app.user?.email}</span>
                                                <span className="text-xs text-muted-foreground">User ID: {app.user?.id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <Badge variant="outline" className="w-fit">{app.loanType}</Badge>
                                                {app.bankName && (
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <FileText className="h-3 w-3" /> {app.bankName}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-primary">
                                                {formatCurrency(app.amount)}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {app.tenureMonths} Months
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(app.status)}>
                                                {app.status || 'PENDING'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleView(app)}
                                            >
                                                <Eye className="h-4 w-4 mr-1" /> View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Application Details Dialog */}
            <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Application Details #{selectedApp?.id}</DialogTitle>
                        <DialogDescription>
                            Review application details and update status.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedApp && (
                        <div className="grid gap-6 py-4">
                            {/* Key Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Applicant</Label>
                                    <div className="font-medium">{selectedApp.user?.email}</div>
                                    <div className="text-sm text-muted-foreground">ID: {selectedApp.user?.id}</div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Bank & Product</Label>
                                    <div className="font-medium">{selectedApp.bankName}</div>
                                    <div className="text-sm text-muted-foreground">{selectedApp.productName || selectedApp.loanType}</div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Loan Details</Label>
                                    <div className="font-medium text-lg text-primary">{formatCurrency(selectedApp.amount)}</div>
                                    <div className="text-sm text-muted-foreground">{selectedApp.tenureMonths} Months Tenure</div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Submission Date</Label>
                                    <div className="font-medium">{new Date(selectedApp.createdAt).toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <Label className="mb-2 block">Update Application Status</Label>
                                <div className="flex items-center gap-4">
                                    <Select
                                        value={newStatus}
                                        onValueChange={setNewStatus}
                                        disabled={isUpdating}
                                    >
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SUBMITTED">Submitted</SelectItem>
                                            <SelectItem value="VERIFIED">Verified</SelectItem>
                                            <SelectItem value="PROCESSING">Processing</SelectItem>
                                            <SelectItem value="APPROVED">Approved</SelectItem>
                                            <SelectItem value="DISBURSED">Disbursed</SelectItem>
                                            <SelectItem value="REJECTED">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        onClick={handleStatusUpdate}
                                        disabled={isUpdating || newStatus === selectedApp.status}
                                    >
                                        {isUpdating ? "Updating..." : "Update Status"}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Changing status will update the user's dashboard immediately.
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedApp(null)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}