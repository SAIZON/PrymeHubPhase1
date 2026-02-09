import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription, // 1. Added for accessibility fix
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// Note: Ensure this path matches your folder structure (service vs services)
import { adminBankService, Bank } from "@/service/admin-bank";

export default function ManageBanks() {
    const { toast } = useToast();
    const [banks, setBanks] = useState<Bank[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // 2. Added State to track editing
    const [editingBank, setEditingBank] = useState<Bank | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        baseInterestRate: "",
        logoUrl: "",
        active: true,
    });

    useEffect(() => {
        loadBanks();
    }, []);

    const loadBanks = async () => {
        try {
            const data = await adminBankService.getAllBanks();
            setBanks(data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load banks",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Setup for Creating New Bank
    const openAddModal = () => {
        setEditingBank(null); // Clear edit mode
        setFormData({ name: "", baseInterestRate: "", logoUrl: "", active: true });
        setIsOpen(true);
    };

    // 4. Setup for Editing Existing Bank
    const openEditModal = (bank: Bank) => {
        setEditingBank(bank); // Set edit mode
        setFormData({
            name: bank.name,
            baseInterestRate: bank.baseInterestRate?.toString() || "",
            logoUrl: bank.logoUrl || "",
            active: bank.active,
        });
        setIsOpen(true);
    };

    // 5. Handle Submit (Supports BOTH Create and Update)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                name: formData.name,
                logoUrl: formData.logoUrl,
                active: formData.active,
                baseInterestRate: parseFloat(formData.baseInterestRate) || 0,
            };

            if (editingBank) {
                // Update Logic
                await adminBankService.updateBank(editingBank.id, payload);
                toast({ title: "Updated", description: "Bank details updated successfully" });
            } else {
                // Create Logic
                await adminBankService.createBank(payload);
                toast({ title: "Created", description: "Bank added successfully" });
            }

            setIsOpen(false);
            loadBanks();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Operation failed";
            toast({
                variant: "destructive",
                title: "Failed",
                description: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggle = async (bank: Bank) => {
        const originalBanks = [...banks];
        // Optimistic update
        setBanks(banks.map(b => b.id === bank.id ? { ...b, active: !b.active } : b));

        try {
            await adminBankService.toggleStatus(bank.id);
            toast({ title: "Updated", description: `Status changed` });
        } catch (error) {
            setBanks(originalBanks); // Revert
            toast({ variant: "destructive", title: "Error", description: "Failed to update status" });
        }
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Manage Banks</h1>
                    <p className="text-muted-foreground">Configure bank partners and their loan offers</p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openAddModal}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Bank
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editingBank ? "Edit Bank" : "Add New Bank"}</DialogTitle>
                            {/* 6. Added Description to fix warning */}
                            <DialogDescription>
                                {editingBank ? "Update the details for this bank partner." : "Enter the details to onboard a new bank partner."}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Bank Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g., HDFC Bank"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="baseInterestRate">Base Interest Rate (%)</Label>
                                <Input
                                    id="baseInterestRate"
                                    name="baseInterestRate"
                                    type="number"
                                    step="0.01"
                                    value={formData.baseInterestRate}
                                    onChange={(e) => setFormData({...formData, baseInterestRate: e.target.value})}
                                    placeholder="e.g., 8.5"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logoUrl">Logo URL</Label>
                                <Input
                                    id="logoUrl"
                                    name="logoUrl"
                                    value={formData.logoUrl}
                                    onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                                    placeholder="e.g., hdfc-logo.png"
                                />
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                    id="active"
                                    checked={formData.active}
                                    onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                                />
                                <Label htmlFor="active">Active Status</Label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : (editingBank ? "Update Bank" : "Add Bank")}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Cards (Keep existing code) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* ... (Your stats cards code remains the same) ... */}
                <Card className="shadow-card border-border/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{banks.length}</p>
                                <p className="text-sm text-muted-foreground">Total Banks</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-card border-border/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                                <span className="text-lg font-bold text-success">%</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">
                                    {banks.length > 0 ? Math.min(...banks.map(b => b.baseInterestRate || 0)) : 0}%
                                </p>
                                <p className="text-sm text-muted-foreground">Lowest Rate</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-card border-border/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                                <span className="text-lg font-bold text-warning">%</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">
                                    {banks.length > 0
                                        ? (banks.reduce((sum, b) => sum + (b.baseInterestRate || 0), 0) / banks.length).toFixed(2)
                                        : 0}%
                                </p>
                                <p className="text-sm text-muted-foreground">Avg Rate</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Banks Table */}
            <Card className="shadow-card border-border/50">
                <CardHeader>
                    <CardTitle>Bank Partners</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead>Bank</TableHead>
                                <TableHead>Base Rate</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24">Loading...</TableCell>
                                </TableRow>
                            ) : banks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        No banks found. Add one to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                banks.map((bank) => (
                                    <TableRow key={bank.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                  <span className="text-xs font-bold text-primary">
                                                    {bank.name.substring(0, 2).toUpperCase()}
                                                  </span>
                                                </div>
                                                <span className="font-medium">{bank.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-semibold text-primary">{bank.baseInterestRate}%</span>
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={bank.active}
                                                onCheckedChange={() => handleToggle(bank)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 justify-end">
                                                {/* 7. Enabled the Edit Button */}
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => openEditModal(bank)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>

                                                {/* Delete is still disabled (Requires backend implementation) */}
                                                <Button variant="outline" size="icon" disabled className="text-destructive" title="Not implemented">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
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