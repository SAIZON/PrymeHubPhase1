import { useState, useEffect } from "react";
import { Plus, Trash2, Building, Edit, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription, // <--- Fixed Warning
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Ensure this component exists, or use Checkbox
import { useToast } from "@/hooks/use-toast";
import api from "@/service/api";

// --- TYPES ---
interface LoanProduct {
    id: number;
    type: string;
    interestRate: string;
    processingFee: string;
    maxAmount: string;
    tenure: string;
    features: string;
}

interface Bank {
    id: number;
    name: string;
    logoUrl: string;
    active: boolean; // <--- CHANGED from isActive to active (Matches Backend JSON)
    baseInterestRate: number;
    products: LoanProduct[];
}

const defaultProductForm = {
    type: "Personal Loan",
    interestRate: "",
    processingFee: "",
    maxAmount: "",
    tenure: "",
    features: ""
};

export default function ManageBanks() {
    const { toast } = useToast();
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(true);

    // --- DIALOG STATES ---
    const [isAddBankOpen, setIsAddBankOpen] = useState(false);
    const [editingBank, setEditingBank] = useState<Bank | null>(null);
    const [addingProductBankId, setAddingProductBankId] = useState<number | null>(null);
    const [editingProduct, setEditingProduct] = useState<LoanProduct | null>(null);

    // --- FORM STATES ---
    // Using 'active' here too for consistency
    const [bankForm, setBankForm] = useState({ name: "", logoUrl: "", active: true });
    const [productForm, setProductForm] = useState(defaultProductForm);

    // --- FETCH DATA ---
    const fetchBanks = async () => {
        try {
            const res = await api.get<Bank[]>('/admin/banks');
            setBanks(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanks();
    }, []);

    // --- BANK ACTIONS ---

    const handleAddBank = async () => {
        try {
            await api.post('/admin/banks', {
                name: bankForm.name,
                baseInterestRate: 10.0,
                active: bankForm.active,
                logoUrl: bankForm.logoUrl
            });
            toast({ title: "Bank Added" });
            setIsAddBankOpen(false);
            setBankForm({ name: "", logoUrl: "", active: true });
            fetchBanks();
        } catch (e) {
            toast({ title: "Failed", variant: "destructive" });
        }
    };

    const handleUpdateBank = async () => {
        if (!editingBank) return;
        try {
            await api.put(`/admin/banks/${editingBank.id}`, {
                name: bankForm.name,
                logoUrl: bankForm.logoUrl,
                active: bankForm.active, // This is now correctly populated
                baseInterestRate: editingBank.baseInterestRate
            });
            toast({ title: "Bank Updated" });
            setEditingBank(null);
            fetchBanks();
        } catch (e) {
            console.error(e);
            toast({ title: "Update Failed", variant: "destructive" });
        }
    };

    const handleDeleteBank = async (id: number) => {
        if (!confirm("Are you sure? This will delete the bank and all its products.")) return;
        try {
            await api.delete(`/admin/banks/${id}`);
            toast({ title: "Bank Deleted" });
            fetchBanks();
        } catch (e) {
            toast({ title: "Failed", variant: "destructive" });
        }
    };

    const openAddBank = () => {
        setBankForm({ name: "", logoUrl: "", active: true });
        setIsAddBankOpen(true);
    };

    const openEditBank = (bank: Bank) => {
        // Map the incoming 'active' field correctly
        setBankForm({ name: bank.name, logoUrl: bank.logoUrl, active: bank.active });
        setEditingBank(bank);
    };

    // --- PRODUCT ACTIONS ---

    const handleSaveProduct = async () => {
        try {
            if (editingProduct) {
                await api.put(`/admin/products/${editingProduct.id}`, productForm);
                toast({ title: "Product Updated" });
                setEditingProduct(null);
            } else if (addingProductBankId) {
                await api.post(`/admin/banks/${addingProductBankId}/products`, productForm);
                toast({ title: "Product Added" });
                setAddingProductBankId(null);
            }
            setProductForm(defaultProductForm);
            fetchBanks();
        } catch (e) {
            toast({ title: "Failed", variant: "destructive" });
        }
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm("Delete this product?")) return;
        try {
            await api.delete(`/admin/products/${id}`);
            toast({ title: "Product Deleted" });
            fetchBanks();
        } catch (e) {
            toast({ title: "Failed", variant: "destructive" });
        }
    };

    const openAddProduct = (bankId: number) => {
        setProductForm(defaultProductForm);
        setAddingProductBankId(bankId);
    };

    const openEditProduct = (product: LoanProduct) => {
        setProductForm({
            type: product.type,
            interestRate: product.interestRate,
            processingFee: product.processingFee,
            maxAmount: product.maxAmount,
            tenure: product.tenure,
            features: product.features
        });
        setEditingProduct(product);
    };

    // --- RENDER HELPERS ---

    const renderProductInputs = () => (
        <div className="space-y-4 py-2">
            <div className="space-y-2">
                <Label>Loan Type</Label>
                <Input placeholder="e.g. Personal Loan" value={productForm.type} onChange={e => setProductForm({...productForm, type: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Interest Rate</Label>
                    <Input placeholder="e.g. 10.5%" value={productForm.interestRate} onChange={e => setProductForm({...productForm, interestRate: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Processing Fee</Label>
                    <Input placeholder="e.g. 1%" value={productForm.processingFee} onChange={e => setProductForm({...productForm, processingFee: e.target.value})} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Max Amount</Label>
                    <Input placeholder="e.g. 50 Lakhs" value={productForm.maxAmount} onChange={e => setProductForm({...productForm, maxAmount: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Tenure</Label>
                    <Input placeholder="e.g. 5 Years" value={productForm.tenure} onChange={e => setProductForm({...productForm, tenure: e.target.value})} />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Features</Label>
                <Input placeholder="Comma separated (e.g. Instant, Paperless)" value={productForm.features} onChange={e => setProductForm({...productForm, features: e.target.value})} />
            </div>
            <DialogFooter>
                <Button onClick={handleSaveProduct} className="w-full">
                    {editingProduct ? "Update Product" : "Save Product"}
                </Button>
            </DialogFooter>
        </div>
    );

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Banks</h1>
                <Button onClick={openAddBank}><Plus className="mr-2 h-4 w-4" /> Add Bank</Button>
            </div>

            {/* --- ADD BANK DIALOG --- */}
            <Dialog open={isAddBankOpen} onOpenChange={setIsAddBankOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Bank</DialogTitle>
                        <DialogDescription>Create a new bank partner entry.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Bank Name</Label>
                            <Input value={bankForm.name} onChange={e => setBankForm({...bankForm, name: e.target.value})} placeholder="e.g. HDFC Bank" />
                        </div>
                        <div className="space-y-2">
                            <Label>Logo URL</Label>
                            <Input value={bankForm.logoUrl} onChange={e => setBankForm({...bankForm, logoUrl: e.target.value})} placeholder="https://example.com/logo.png" />
                        </div>
                        {/* Optional: Add Active Switch here if needed */}
                        <Button onClick={handleAddBank} className="w-full">Create Bank</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* --- EDIT BANK DIALOG --- */}
            <Dialog open={!!editingBank} onOpenChange={(open) => !open && setEditingBank(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Bank</DialogTitle>
                        <DialogDescription>Update bank details.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Bank Name</Label>
                            <Input value={bankForm.name} onChange={e => setBankForm({...bankForm, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Logo URL</Label>
                            <Input value={bankForm.logoUrl} onChange={e => setBankForm({...bankForm, logoUrl: e.target.value})} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="bank-active"
                                checked={bankForm.active}
                                onCheckedChange={(checked) => setBankForm({...bankForm, active: checked})}
                            />
                            <Label htmlFor="bank-active">Active Status</Label>
                        </div>
                        <Button onClick={handleUpdateBank} className="w-full">Update Bank</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* --- ADD PRODUCT DIALOG --- */}
            <Dialog open={!!addingProductBankId} onOpenChange={(open) => !open && setAddingProductBankId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>Define new loan product terms.</DialogDescription>
                    </DialogHeader>
                    {renderProductInputs()}
                </DialogContent>
            </Dialog>

            {/* --- EDIT PRODUCT DIALOG --- */}
            <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Update existing loan terms.</DialogDescription>
                    </DialogHeader>
                    {renderProductInputs()}
                </DialogContent>
            </Dialog>

            {/* --- BANK LIST --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {banks.map((bank) => (
                    <Card key={bank.id} className="relative overflow-hidden border-2">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/20">
                            <div className="flex items-center gap-4">
                                {bank.logoUrl ? (
                                    <img src={bank.logoUrl} alt={bank.name} className="h-12 w-12 object-contain bg-white rounded-lg p-1 border" />
                                ) : (
                                    <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                                        <Building className="h-6 w-6 text-primary" />
                                    </div>
                                )}
                                <div>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        {bank.name}
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-blue-500" onClick={() => openEditBank(bank)}>
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                    </CardTitle>
                                    <p className={`text-xs mt-1 ${bank.active ? 'text-green-600' : 'text-red-500'}`}>
                                        {bank.active ? 'Active' : 'Inactive'}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteBank(bank.id)} className="hover:bg-red-100 hover:text-red-600">
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h4 className="font-semibold text-foreground">Loan Products</h4>
                                    <Button variant="outline" size="sm" onClick={() => openAddProduct(bank.id)}>
                                        <Plus className="mr-2 h-3 w-3" /> Add Product
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {bank.products && bank.products.length > 0 ? (
                                        bank.products.map((p) => (
                                            <div key={p.id} className="relative bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h5 className="font-bold text-lg text-primary">{p.type}</h5>
                                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{p.interestRate} Interest</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditProduct(p)}>
                                                            <Edit className="h-4 w-4 text-blue-500" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteProduct(p.id)}>
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                                                    <p>Max Amount: <span className="font-medium text-foreground">{p.maxAmount}</span></p>
                                                    <p>Tenure: <span className="font-medium text-foreground">{p.tenure}</span></p>
                                                    <p>Proc. Fee: <span className="font-medium text-foreground">{p.processingFee}</span></p>
                                                </div>
                                                {p.features && (
                                                    <div className="mt-3 pt-3 border-t">
                                                        <p className="text-xs text-muted-foreground mb-1">Features:</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {p.features.split(',').map((f, i) => (
                                                                <span key={i} className="text-[10px] bg-secondary px-2 py-0.5 rounded text-secondary-foreground">
                                                    {f.trim()}
                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : <div className="text-center py-6 text-muted-foreground italic bg-muted/30 rounded-lg">No products added yet.</div>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}