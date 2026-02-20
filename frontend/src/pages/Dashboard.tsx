import { useState, useEffect } from "react";
import {
    CheckCircle,
    Clock,
    FileText,
    Upload,
    Plus,
    Trash2,
    Home,
    LogOut,
    User,
    Bell,
    Settings,
    Eye
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser, logout, User as AuthUser } from "@/service/auth";
import { uploadDocument } from "@/service/dashboard";
import { NewApplicationModal, PrefillData } from "@/components/dashboard/NewApplicationModal";
import { AlertCircle, Loader2 } from "lucide-react";
import {
    getDashboardStats,
    getRecentApplications,
    getNotifications,
    getExternalLoans,
    getDocuments,
    DashboardStats,
    Application,
    Notification,
    ExternalLoan,
    LoanDocument,
    markNotificationAsRead
} from "@/service/dashboard";
import {Select, SelectContent,SelectTrigger, SelectItem, SelectValue} from "@/components/ui/select.tsx";


// --- SUB-COMPONENTS ---

function ApplicationTimeline({ application }: { application?: Application }) {
    if (!application) {
        return (
            <Card className="mb-8 shadow-card border-border/50 bg-muted/20">
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-semibold text-foreground">No Active Applications</h3>
                    <p className="text-muted-foreground mb-4">Start a new loan application to track its status here.</p>
                </CardContent>
            </Card>
        );
    }

    const currentStatus = application.status || 'SUBMITTED';

    let activeIndex = 0;
    if (currentStatus === 'SUBMITTED') activeIndex = 1;
    else if (currentStatus === 'VERIFIED') activeIndex = 2;
    else if (currentStatus === 'PROCESSING') activeIndex = 3;
    else if (currentStatus === 'APPROVED' || currentStatus === 'DISBURSED') activeIndex = 4;
    else if (currentStatus === 'REJECTED') activeIndex = 0;

    const steps = [
        { id: 1, name: "Submitted" },
        { id: 2, name: "Verified" },
        { id: 3, name: "Processing" },
        { id: 4, name: application.status === 'APPROVED' ? "Approved" : "Disbursed" },
    ];

    return (
        <Card className="mb-8 shadow-card border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Application Status <span className="text-muted-foreground font-normal text-sm ml-2">#{application.id}</span>
                    </div>
                    <Badge variant={currentStatus === 'REJECTED' ? 'destructive' : 'outline'}>
                        {currentStatus}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {currentStatus === 'REJECTED' ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-center">
                        This application has been rejected. Please contact support.
                    </div>
                ) : (
                    <div className="flex items-center justify-between overflow-x-auto pb-4 pt-2">
                        {steps.map((step, index) => {
                            const isCompleted = index < activeIndex;
                            const isCurrent = index === activeIndex - 1;

                            return (
                                <div key={step.id} className="flex items-center flex-1 min-w-[100px] relative">
                                    {index < steps.length - 1 && (
                                        <div className={`absolute left-1/2 top-5 w-full h-1 -z-10 ${
                                            isCompleted ? "bg-green-500" : "bg-gray-200"
                                        }`} />
                                    )}

                                    <div className="flex flex-col items-center flex-1 z-10">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-all ${
                                            isCompleted ? "bg-green-500 border-green-500 text-white" :
                                                isCurrent ? "bg-white border-primary text-primary shadow-[0_0_0_4px_rgba(37,99,235,0.2)]" :
                                                    "bg-white border-gray-200 text-gray-400"
                                        }`}>
                                            {isCompleted ? <CheckCircle className="h-5 w-5" /> : <span className="font-semibold text-sm">{step.id}</span>}
                                        </div>
                                        <span className={`text-xs font-medium text-center ${
                                            isCurrent ? "text-primary font-bold" :
                                                isCompleted ? "text-green-600" : "text-muted-foreground"
                                        }`}>
                                            {step.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function ApplicationsTab({ applications, onView }: { applications: Application[], onView: (app: Application) => void }) {
    return (
        <Card className="shadow-card border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    My Applications
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                    No applications found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            applications.map((app) => (
                                <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onView(app)}>
                                    <TableCell className="font-mono text-xs">#{app.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{app.bankName || "General Application"}</span>
                                            <span className="text-xs text-muted-foreground">{app.loanType}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">₹{app.amount.toLocaleString('en-IN')}</TableCell>
                                    <TableCell>
                                        <Badge className={
                                            app.status === 'APPROVED' ? 'bg-green-100 text-green-800 border-green-200' :
                                                app.status === 'REJECTED' ? 'bg-red-100 text-red-800 border-red-200' :
                                                    'bg-yellow-100 text-yellow-800 border-yellow-200'
                                        }>
                                            {app.status || 'PENDING'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onView(app); }}>
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
    );
}

function DocumentsTab({ documents, applications, onUploadSuccess }: {
    documents: LoanDocument[],
    applications: Application[],
    onUploadSuccess: () => void
}) {
    const [file, setFile] = useState<File | null>(null);
    const [selectedApp, setSelectedApp] = useState<string>("");
    const [docType, setDocType] = useState<string>("IDENTITY_PROOF");
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast();

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !selectedApp) {
            toast({ title: "Error", description: "Please select a file and an application.", variant: "destructive" });
            return;
        }

        setIsUploading(true);
        try {
            await uploadDocument(file, parseInt(selectedApp), docType);
            toast({ title: "Success", description: "Document uploaded successfully." });
            setFile(null); // Reset file input
            onUploadSuccess(); // Call parent to refresh data
        } catch (error) {
            toast({ title: "Upload Failed", description: "Could not upload document.", variant: "destructive" });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Upload Form Card */}
            <Card className="shadow-card border-border/50">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Upload className="h-5 w-5 text-primary"/>
                        Upload New Document
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <Label>Link to Application</Label>
                            <Select value={selectedApp} onValueChange={setSelectedApp} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Application"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {applications.map(app => (
                                        <SelectItem key={app.id} value={app.id.toString()}>
                                            #{app.id} - {app.loanType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Document Type</Label>
                            <Select value={docType} onValueChange={setDocType} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IDENTITY_PROOF">Identity Proof</SelectItem>
                                    <SelectItem value="ADDRESS_PROOF">Address Proof</SelectItem>
                                    <SelectItem value="INCOME_PROOF">Income Proof</SelectItem>
                                    <SelectItem value="BANK_STATEMENT">Bank Statement</SelectItem>
                                    <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Select File (Max 5MB)</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                required
                            />
                        </div>

                        <Button type="submit" disabled={isUploading || !file || !selectedApp}>
                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> :
                                <Upload className="h-4 w-4 mr-2"/>}
                            Upload
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Existing Documents Table */}
            <Card className="shadow-card border-border/50">
                {/* ... existing CardHeader ... */}
                <CardContent>
                    <Table>
                        {/* ... existing TableHeader ... */}
                        <TableBody>
                            {documents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        No documents uploaded yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                documents.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium flex items-center">
                                            <FileText className="mr-2 h-4 w-4 text-blue-500"/>
                                            {doc.fileName}
                                        </TableCell>
                                        <TableCell>{doc.category}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        doc.status === "VERIFIED" ? "bg-green-50 text-green-700 border-green-200" :
                                                            doc.status === "REJECTED" ? "bg-red-50 text-red-700 border-red-200" :
                                                                "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                    }
                                                >
                                                    {doc.status}
                                                </Badge>
                                                {/* Display Rejection Remarks if available */}
                                                {doc.status === "REJECTED" && doc.adminRemarks && (
                                                    <span className="text-xs text-red-600 flex items-center mt-1">
                                                        <AlertCircle className="h-3 w-3 mr-1"/>
                                                        {doc.adminRemarks}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{new Date(doc.uploadedAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="text-red-500">
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
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

// --- CORRECTED COMPONENT: Notifications Table ---
// Receives `onRead` callback from parent to update global state
function NotificationsTab({ notifications, onRead }: { notifications: Notification[], onRead: (id: string   ) => void }) {
    return (
        <Card className="shadow-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {notifications.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No new notifications.</p>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                // Trigger Parent Callback
                                onClick={() => !notification.read && onRead(notification.id)}
                                className={`flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
                                    notification.read
                                        ? "bg-muted/30 opacity-70"
                                        : "bg-blue-50/50 border-blue-100 hover:bg-blue-50 shadow-sm"
                                }`}
                            >
                                <div className={`flex-shrink-0 mt-0.5 ${notification.read ? "text-muted-foreground" : "text-blue-600"}`}>
                                    <Bell className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <p className={`font-medium text-foreground ${!notification.read ? "font-bold" : ""}`}>
                                                {notification.title}
                                            </p>
                                            {!notification.read && (
                                                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                                            )}
                                        </div>
                                        <p className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <p className={`text-sm ${notification.read ? "text-muted-foreground" : "text-foreground/90"}`}>
                                        {notification.message}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function ProfileTab({ user }: { user: AuthUser | null }) {
    return (
        <Card className="shadow-card border-border/50 max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Profile Settings
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground text-lg">{user?.name || "User"}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Full Name</Label>
                            <Input value={user?.name || ""} readOnly className="bg-muted" />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input value={user?.email || ""} readOnly className="bg-muted" />
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
                    To update your profile details, please contact customer support.
                </div>
            </CardContent>
        </Card>
    );
}

// --- MAIN PAGE COMPONENT ---

export default function Dashboard() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

    // Data States
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [externalLoans, setExternalLoans] = useState<ExternalLoan[]>([]);
    const [documents, setDocuments] = useState<LoanDocument[]>([]);

    // UI States
    const [selectedApp, setSelectedApp] = useState<Application | undefined>(undefined);

    const location = useLocation();

    // Modal States
    const [prefillProduct, setPrefillProduct] = useState<PrefillData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (location.state && location.state.prefillProduct) {
            setPrefillProduct(location.state.prefillProduct);
            setIsModalOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const loadData = async () => {
        try {
            const currentUser = getCurrentUser();
            if (currentUser) setUser(currentUser);

            const [statsData, appsData, notifData, loansData, docsData] = await Promise.all([
                getDashboardStats(),
                getRecentApplications(),
                getNotifications(),
                getExternalLoans(),
                getDocuments()
            ]);

            setStats(statsData.data);
            setApplications(appsData.data);
            setNotifications(notifData.data);
            setExternalLoans(loansData.data);
            setDocuments(docsData.data);

            if (appsData.data.length > 0) {
                setSelectedApp(prev => prev ? appsData.data.find(a => a.id === prev.id) || appsData.data[0] : appsData.data[0]);
            }
        } catch (error) {
            console.error("Dashboard sync failed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleLogout = () => {
        logout();
    };

    // --- NEW: Handle Notification Read in Parent ---
    const handleNotificationRead = async (id: string) => {
        // 1. Optimistically update local state so badge count drops immediately
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );

        try {
            // 2. Call API in background
            await markNotificationAsRead(id);
        } catch (error) {
            console.error("Failed to sync read status", error);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 pb-20">
            {/* Header */}
            <header className="bg-card border-b border-border sticky top-0 z-50">
                <div className="container flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <span className="text-lg font-bold text-primary-foreground">P</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">PRYME</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                <User className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="hidden md:block text-sm font-medium">{user?.name || "User"}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
                        <p className="text-muted-foreground">Track your applications and manage your profile.</p>
                    </div>

                    <div className="flex gap-2">
                        {!isModalOpen && (
                            <NewApplicationModal onSuccess={loadData} />
                        )}

                        <Button variant="outline" onClick={loadData}>
                            <Clock className="h-4 w-4 mr-2" /> Refresh
                        </Button>
                    </div>
                </div>

                <ApplicationTimeline application={selectedApp} />

                <Tabs defaultValue="applications" className="space-y-6">
                    <TabsList className="h-auto p-1 flex-wrap">
                        <TabsTrigger value="applications" className="py-2.5 px-4">
                            <FileText className="h-4 w-4 mr-2" />
                            Applications
                        </TabsTrigger>
                        <TabsTrigger value="documents" className="py-2.5 px-4">
                            <Upload className="h-4 w-4 mr-2" />
                            Documents
                        </TabsTrigger>
                        <TabsTrigger value="loans" className="py-2.5 px-4">
                            <Home className="h-4 w-4 mr-2" />
                            External Loans
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="py-2.5 px-4">
                            <Bell className="h-4 w-4 mr-2" />
                            Notifications
                            {notifications.filter(n => !n.read).length > 0 && (
                                <span className="ml-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">
                                    {notifications.filter(n => !n.read).length}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="py-2.5 px-4">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="applications">
                        <ApplicationsTab applications={applications} onView={setSelectedApp} />
                    </TabsContent>

                    <TabsContent value="documents">
                        <DocumentsTab
                            documents={documents}
                            applications={applications}
                            onUploadSuccess={loadData}
                        />
                    </TabsContent>

                    <TabsContent value="loans">
                        <Card className="shadow-card border-border/50">
                            <CardHeader><CardTitle>External Loans Tracker</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {externalLoans.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-4">No external loans linked.</p>
                                    ) : (
                                        externalLoans.map((loan) => (
                                            <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                                        <Home className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{loan.bankName} - {loan.loanType}</p>
                                                        <p className="text-sm text-muted-foreground">EMI: ₹{loan.emiAmount.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">₹{loan.outstandingAmount.toLocaleString()}</p>
                                                    <p className="text-xs text-muted-foreground">Outstanding</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications">
                        {/* PASS THE HANDLER HERE */}
                        <NotificationsTab
                            notifications={notifications}
                            onRead={handleNotificationRead}
                        />
                    </TabsContent>

                    <TabsContent value="profile">
                        <ProfileTab user={user} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}