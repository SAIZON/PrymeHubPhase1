import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { leadService } from "@/service/lead"; // Import the service

export default function Contact() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        loanType: "General Inquiry", // Changed from 'subject' to 'loanType'
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // FIX: Call the real backend service instead of simulating
            await leadService.submitLead({
                name: formData.name,
                email: formData.email,
                mobile: formData.phone,
                loanType: formData.loanType,
                message: formData.message,
            });

            toast({
                title: "Message Sent!",
                description: "We'll get back to you within 24 hours.",
            });

            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                loanType: "General Inquiry",
                message: ""
            });

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to send message. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-hero py-16 md:py-20">
                <div className="container text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions about loans or need assistance? Our team is here to help you
                        find the perfect financial solution.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 md:py-20">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <Card className="lg:col-span-2 shadow-card border-border/50">
                            <CardHeader>
                                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>

                                        {/* Changed Subject Input to Loan Type Select */}
                                        <div className="space-y-2">
                                            <Label htmlFor="loanType">Inquiry Type</Label>
                                            <Select
                                                value={formData.loanType}
                                                onValueChange={(value) => setFormData({ ...formData, loanType: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                                    <SelectItem value="Home Loan">Home Loan</SelectItem>
                                                    <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                                                    <SelectItem value="Business Loan">Business Loan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us how we can help you..."
                                            rows={5}
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Info (Static) */}
                        <div className="space-y-6">
                            <Card className="shadow-card border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Office Address</h3>
                                            <p className="text-muted-foreground text-sm">
                                                123 Finance Tower<br />
                                                Vijay Nagar, Scheme No. 54<br />
                                                Indore, Madhya Pradesh - 452010
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-card border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                                            <p className="text-muted-foreground text-sm">
                                                +91 731 123 4567<br />
                                                +91 98765 43210 (WhatsApp)
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-card border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Email</h3>
                                            <p className="text-muted-foreground text-sm">
                                                support@pryme.in<br />
                                                loans@pryme.in
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-card border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Monday - Saturday<br />
                                                9:00 AM - 6:00 PM IST
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="mt-12 max-w-6xl mx-auto">
                        <Card className="shadow-card border-border/50 overflow-hidden">
                            <div className="h-[300px] bg-muted flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                                    <p className="text-muted-foreground font-medium">Google Maps Integration</p>
                                    <p className="text-sm text-muted-foreground">Vijay Nagar, Indore, MP</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}