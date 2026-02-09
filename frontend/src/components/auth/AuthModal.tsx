import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { login, register, LoginRequest, RegisterRequest } from "@/service/auth.ts"; // Fixed Imports
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
    onLoginSuccess?: () => void;
}

export function AuthModal({ onLoginSuccess }: AuthModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("login");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    // Typed State
    const [loginData, setLoginData] = useState<LoginRequest>({ email: "", password: "" });
    const [registerData, setRegisterData] = useState<RegisterRequest>({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "USER",
    });

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(loginData);

            // Save token and user
            const { accessToken, user } = response.data;
            localStorage.setItem("token", accessToken);
            localStorage.setItem("user", JSON.stringify(user));

            toast({
                title: "Welcome back!",
                description: "You have successfully logged in.",
            });

            setIsOpen(false);
            if (onLoginSuccess) onLoginSuccess();
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: err.response?.data?.message || "Invalid credentials",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(registerData);
            toast({
                title: "Account Created!",
                description: "Please login with your new credentials.",
            });
            setActiveTab("login");
        } catch (err) {
            console.error(err);
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: err.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                    Get Started / Login
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Welcome to PrymeHub</DialogTitle>
                    <DialogDescription>
                        Access your dashboard, track loans, and manage your profile.
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <form onSubmit={handleLoginSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="register">
                        <form onSubmit={handleRegisterSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    value={registerData.name}
                                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-email">Email</Label>
                                <Input
                                    id="reg-email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile</Label>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    placeholder="9876543210"
                                    required
                                    value={registerData.mobile}
                                    onChange={(e) => setRegisterData({...registerData, mobile: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-password">Password</Label>
                                <Input
                                    id="reg-password"
                                    type="password"
                                    required
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}