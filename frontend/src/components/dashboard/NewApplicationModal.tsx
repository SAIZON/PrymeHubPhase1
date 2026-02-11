import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitApplication } from "@/service/dashboard";
import { Plus, Loader2 } from "lucide-react";

export interface PrefillData {
    id?: number;
    loanType?: string;
    maxLoanAmount?: string;
    bankName?: string;
    // Add other fields you might pass
}

// 2. Update the Props interface
interface NewApplicationModalProps {
    onSuccess: () => void;
    initialData?: PrefillData | null; // <--- Use the type here
    isOpen?: boolean;
    onClose?: () => void;
}

export function NewApplicationModal({ onSuccess, initialData, isOpen, onClose }: NewApplicationModalProps) {
    // If isOpen is provided (controlled), use it. Otherwise internal state.
    const [internalOpen, setInternalOpen] = useState(false);
    const show = isOpen !== undefined ? isOpen : internalOpen;
    const setShow = onClose || setInternalOpen;

    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        loanType: "",
        amount: "",
        tenureMonths: "",
        productId: null as number | null,
        bankName: ""
    });

    // Pre-fill form when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                loanType: initialData.loanType || "Personal Loan",
                amount: initialData.maxLoanAmount ? initialData.maxLoanAmount.replace(/\D/g,'') : "", // Strip non-digits
                tenureMonths: "12", // Default or extract from string like "5 Years"
                productId: initialData.id,
                bankName: initialData.bankName
            });
            // If controlled, ensure it's open
            if(isOpen === undefined) setInternalOpen(true);
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await submitApplication({
                loanType: formData.loanType,
                amount: parseFloat(formData.amount),
                tenureMonths: parseInt(formData.tenureMonths),
                productId: formData.productId || undefined
            });

            toast({
                title: "Application Submitted!",
                description: formData.bankName
                    ? `Your application for ${formData.bankName} has been sent.`
                    : "We have received your loan request.",
            });

            setShow(false);
            setFormData({ loanType: "", amount: "", tenureMonths: "", productId: null, bankName: "" });
            onSuccess();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={show} onOpenChange={setShow}>
            {/* Only show trigger if not controlled externally */}
            {!isOpen && (
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Application
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {formData.bankName ? `Apply to ${formData.bankName}` : "Apply for a Loan"}
                    </DialogTitle>
                    <DialogDescription>
                        {formData.bankName ? "Confirm your details below." : "Fill in the details to start."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">

                    <div className="space-y-2">
                        <Label>Loan Type</Label>
                        <Select
                            value={formData.loanType}
                            onValueChange={(val) => setFormData({...formData, loanType: val})}
                            required
                            disabled={!!formData.productId} // Lock if pre-selected
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select loan type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                                <SelectItem value="Home Loan">Home Loan</SelectItem>
                                <SelectItem value="Business Loan">Business Loan</SelectItem>
                                <SelectItem value="Car Loan">Car Loan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Amount (₹)</Label>
                            <Input
                                type="number"
                                placeholder="500000"
                                required
                                value={formData.amount}
                                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Tenure (Months)</Label>
                            <Input
                                type="number"
                                placeholder="12"
                                required
                                value={formData.tenureMonths}
                                onChange={(e) => setFormData({...formData, tenureMonths: e.target.value})}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Submit Application
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}