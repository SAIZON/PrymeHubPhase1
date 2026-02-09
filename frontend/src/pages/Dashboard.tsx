import { useState } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const applicationSteps = [
  { id: 1, name: "Submitted", status: "completed" },
  { id: 2, name: "Verified", status: "completed" },
  { id: 3, name: "Processing", status: "current" },
  { id: 4, name: "Disbursed", status: "pending" },
];

const uploadedDocs = [
  { id: 1, name: "Aadhar Card.pdf", category: "KYC", status: "verified" },
  { id: 2, name: "PAN Card.pdf", category: "KYC", status: "verified" },
  { id: 3, name: "Salary Slip - Jan 2025.pdf", category: "Income Proof", status: "pending" },
  { id: 4, name: "Property Documents.pdf", category: "Property", status: "pending" },
];

const existingLoans = [
  { id: 1, bank: "HDFC Bank", emi: 15000, totalDebt: 450000 },
  { id: 2, bank: "Bajaj Finserv", emi: 8500, totalDebt: 120000 },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "verified") {
    return (
      <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle className="h-3 w-3 mr-1" />
        Verified
      </Badge>
    );
  }
  return (
    <Badge className="bg-warning/10 text-warning border-warning/20">
      <Clock className="h-3 w-3 mr-1" />
      Pending
    </Badge>
  );
}

function ApplicationTimeline() {
  return (
    <Card className="mb-8 shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Application Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between overflow-x-auto pb-4">
          {applicationSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1 min-w-[120px]">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.status === "completed"
                      ? "bg-success text-success-foreground"
                      : step.status === "current"
                      ? "bg-primary text-primary-foreground animate-pulse"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.status === "completed" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <span
                  className={`text-sm font-medium text-center ${
                    step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < applicationSteps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 rounded ${
                    step.status === "completed" ? "bg-success" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentsTab() {
  return (
    <div className="space-y-6">
      {/* Upload Zones */}
      <div className="grid md:grid-cols-3 gap-4">
        {["KYC Documents", "Income Proof", "Property Documents"].map((category) => (
          <div
            key={category}
            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-accent/30 transition-colors cursor-pointer"
          >
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="font-medium text-foreground">{category}</p>
            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
          </div>
        ))}
      </div>

      {/* Uploaded Files */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.category}</p>
                  </div>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoansTab() {
  const [loans, setLoans] = useState(existingLoans);
  const [newLoan, setNewLoan] = useState({ bank: "", emi: "", totalDebt: "" });

  const addLoan = () => {
    if (newLoan.bank && newLoan.emi && newLoan.totalDebt) {
      setLoans([
        ...loans,
        {
          id: loans.length + 1,
          bank: newLoan.bank,
          emi: parseInt(newLoan.emi),
          totalDebt: parseInt(newLoan.totalDebt),
        },
      ]);
      setNewLoan({ bank: "", emi: "", totalDebt: "" });
    }
  };

  const removeLoan = (id: number) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          Existing Loans Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bank</TableHead>
              <TableHead>EMI</TableHead>
              <TableHead>Total Debt</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="font-medium">{loan.bank}</TableCell>
                <TableCell>₹{loan.emi.toLocaleString("en-IN")}</TableCell>
                <TableCell>₹{loan.totalDebt.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLoan(loan.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add New Loan */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-4">Add Existing Loan</h4>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <Label htmlFor="bank" className="text-xs">Bank Name</Label>
              <Input
                id="bank"
                placeholder="e.g., ICICI"
                value={newLoan.bank}
                onChange={(e) => setNewLoan({ ...newLoan, bank: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="emi" className="text-xs">EMI Amount</Label>
              <Input
                id="emi"
                type="number"
                placeholder="₹"
                value={newLoan.emi}
                onChange={(e) => setNewLoan({ ...newLoan, emi: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="debt" className="text-xs">Total Debt</Label>
              <Input
                id="debt"
                type="number"
                placeholder="₹"
                value={newLoan.totalDebt}
                onChange={(e) => setNewLoan({ ...newLoan, totalDebt: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={addLoan} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Loan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const mockNotifications = [
  {
    id: 1,
    title: "KYC Document Verified",
    message: "Your Aadhar Card document has been successfully verified.",
    time: "2 hours ago",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "New HDFC Offer Available",
    message: "Get ₹500 cashback on HDFC Home Loans. Use code: HDFC500",
    time: "5 hours ago",
    type: "offer",
    read: false,
  },
  {
    id: 3,
    title: "Application Status Updated",
    message: "Your loan application has moved to 'Processing' stage.",
    time: "1 day ago",
    type: "info",
    read: true,
  },
  {
    id: 4,
    title: "Document Required",
    message: "Please upload your latest salary slip for income verification.",
    time: "2 days ago",
    type: "warning",
    read: true,
  },
  {
    id: 5,
    title: "Welcome to PRYME!",
    message: "Thank you for signing up. Complete your profile to get started.",
    time: "3 days ago",
    type: "info",
    read: true,
  },
];

function NotificationsTab() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "offer":
        return <Bell className="h-5 w-5 text-accent-foreground" />;
      case "warning":
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications
          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {unreadCount} new
            </Badge>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                notification.read 
                  ? "bg-muted/30" 
                  : "bg-primary/5 hover:bg-primary/10"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className={`font-medium text-foreground ${!notification.read ? "font-semibold" : ""}`}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileTab() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    mobile: "+91 98765 43210",
    address: "123 Main Street, Bandra West, Mumbai, Maharashtra 400050",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile logic here
    console.log("Profile saved:", profile);
  };

  return (
    <Card className="shadow-card border-border/50 max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Current Address</Label>
            <Textarea
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Dashboard Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">P</span>
            </div>
            <span className="text-xl font-bold text-foreground">PRYME</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden md:block text-sm font-medium">John Doe</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Track your loan application status and manage documents</p>
        </div>

        {/* Application Timeline */}
        <ApplicationTimeline />

        {/* Tabs for Documents, Loans, Notifications, Profile */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="h-auto p-1 flex-wrap">
            <TabsTrigger value="documents" className="py-2.5 px-4">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="loans" className="py-2.5 px-4">
              <Home className="h-4 w-4 mr-2" />
              Existing Loans
            </TabsTrigger>
            <TabsTrigger value="notifications" className="py-2.5 px-4">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="profile" className="py-2.5 px-4">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="loans">
            <LoansTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
