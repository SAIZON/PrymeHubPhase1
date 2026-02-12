import { useState } from "react";
import { Plus, Trash2, Tag, Calendar, Edit, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Offer {
  id: number;
  title: string;
  code: string;
  discountAmount: string;
  expiry: string;
}

const initialOffers: Offer[] = [
  { id: 1, title: "Get ₹500 Cashback on HDFC Loans", code: "HDFC500", discountAmount: "₹500", expiry: "2025-02-28" },
  { id: 2, title: "Zero Processing Fee", code: "PRYME2025", discountAmount: "100%", expiry: "2025-03-31" },
  { id: 3, title: "Special 0.25% Lower Interest on SBI Home Loans", code: "SBIHOME", discountAmount: "0.25%", expiry: "2025-02-15" },
  { id: 4, title: "First-time user bonus - ₹1000 off", code: "WELCOME1K", discountAmount: "₹1000", expiry: "2025-04-30" },
];

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [isOpen, setIsOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    discountAmount: "",
    expiry: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingOffer(null);
    setFormData({ title: "", code: "", discountAmount: "", expiry: "" });
    setIsOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      code: offer.code,
      discountAmount: offer.discountAmount,
      expiry: offer.expiry,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOffer) {
      setOffers(
        offers.map((o) =>
          o.id === editingOffer.id ? { ...o, ...formData } : o
        )
      );
    } else {
      setOffers([
        ...offers,
        {
          id: Math.max(...offers.map(o => o.id), 0) + 1,
          ...formData,
        },
      ]);
    }
    setIsOpen(false);
  };

  const deleteOffer = (id: number) => {
    setOffers(offers.filter((o) => o.id !== id));
  };

  const isExpired = (date: string) => new Date(date) < new Date();
  const activeOffers = offers.filter(o => !isExpired(o.expiry));
  const expiredOffers = offers.filter(o => isExpired(o.expiry));

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Offers Engine</h1>
          <p className="text-muted-foreground">Create and manage promotional offers for the ribbon stack</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddModal}>
              <Plus className="h-4 w-4 mr-2" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingOffer ? "Edit Offer" : "Create New Offer"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Offer Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Get ₹500 Cashback"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Promo Code</Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g., PRYME2025"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountAmount">Discount Amount</Label>
                  <Input
                    id="discountAmount"
                    name="discountAmount"
                    value={formData.discountAmount}
                    onChange={handleChange}
                    placeholder="e.g., ₹500 or 10%"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  name="expiry"
                  type="date"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingOffer ? "Update Offer" : "Create Offer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="shadow-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{offers.length}</p>
                <p className="text-sm text-muted-foreground">Total Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Tag className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{activeOffers.length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{expiredOffers.length}</p>
                <p className="text-sm text-muted-foreground">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Offers */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Active Offers ({activeOffers.length})</h2>
          {activeOffers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {activeOffers.map((offer) => (
                <Card key={offer.id} className="shadow-card border-border/50">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-foreground">{offer.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {offer.code && (
                            <Badge variant="secondary" className="font-mono">
                              {offer.code}
                            </Badge>
                          )}
                          <Badge className="bg-success/10 text-success border-success/20">
                            {offer.discountAmount}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Expires: {offer.expiry}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditModal(offer)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Offer</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this offer? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteOffer(offer.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-card border-border/50">
              <CardContent className="p-8 text-center">
                <Tag className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No active offers</p>
                <p className="text-sm text-muted-foreground">Create a new offer to display on the homepage ribbon</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Expired Offers */}
        {expiredOffers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Expired Offers ({expiredOffers.length})</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {expiredOffers.map((offer) => (
                <Card key={offer.id} className="shadow-card border-border/50 opacity-60">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium text-foreground">{offer.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {offer.code && (
                            <Badge variant="secondary" className="font-mono">
                              {offer.code}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-destructive border-destructive/30">
                            Expired
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-destructive">
                          <Calendar className="h-3 w-3" />
                          Expired: {offer.expiry}
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Expired Offer</AlertDialogTitle>
                            <AlertDialogDescription>
                              Remove this expired offer from the system?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteOffer(offer.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
