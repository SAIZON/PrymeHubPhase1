// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/hooks/use-toast"; // Import toast hook
// import { authService } from "@/service/auth"; // Import auth service
//
// export default function Login() {
//     const navigate = useNavigate();
//     const { toast } = useToast();
//
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false); // Add loading state
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//
//         try {
//             // 1. Call Backend
//             const data = await authService.login({ email, password });
//
//             // 2. Store Session Data
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("user", JSON.stringify({
//                 fullName: data.fullName,
//                 role: data.role
//             }));
//
//             // 3. User Feedback
//             toast({
//                 title: "Welcome back!",
//                 description: `Successfully logged in as ${data.fullName}`,
//             });
//
//             // 4. Redirect based on Role
//             if (data.role === 'ADMIN') {
//                 navigate("/admin");
//             } else {
//                 navigate("/dashboard");
//             }
//
//         } catch (error) {
//             // 5. Safe Error Handling
//             const errorMessage = error instanceof Error ? error.message : "Invalid credentials";
//
//             toast({
//                 variant: "destructive",
//                 title: "Login failed",
//                 description: errorMessage,
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const handleAdminDemo = () => {
//         // Note: For a real app, you might want to remove this or
//         // autofill a demo admin account instead of bypassing auth
//         navigate("/admin/dashboard");
//     };
//
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4">
//             <Card className="w-full max-w-md shadow-lg border-border/50">
//                 <CardHeader className="text-center space-y-2">
//                     <Link to="/" className="flex items-center justify-center gap-2 mb-4">
//                         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
//                             <span className="text-xl font-bold text-primary-foreground">P</span>
//                         </div>
//                         <span className="text-2xl font-bold text-foreground">PRYME</span>
//                     </Link>
//                     <CardTitle className="text-2xl">Welcome back</CardTitle>
//                     <CardDescription>Enter your credentials to access your account</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="email">Email</Label>
//                             <div className="relative">
//                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="name@example.com"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="pl-10"
//                                     required
//                                     disabled={isLoading}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="space-y-2">
//                             <div className="flex justify-between items-center">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Link
//                                     to="/forgot-password"
//                                     className="text-sm text-primary hover:underline"
//                                 >
//                                     Forgot Password?
//                                 </Link>
//                             </div>
//                             <div className="relative">
//                                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                     id="password"
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Enter your password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="pl-10 pr-10"
//                                     required
//                                     disabled={isLoading}
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                                     disabled={isLoading}
//                                 >
//                                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                                 </button>
//                             </div>
//                         </div>
//
//                         <Button
//                             type="submit"
//                             variant="hero"
//                             className="w-full"
//                             size="lg"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? "Signing In..." : "Sign In"}
//                         </Button>
//                     </form>
//
//                     <div className="relative">
//                         <div className="absolute inset-0 flex items-center">
//                             <Separator className="w-full" />
//                         </div>
//                         <div className="relative flex justify-center text-xs uppercase">
//                             <span className="bg-card px-2 text-muted-foreground">Or</span>
//                         </div>
//                     </div>
//
//                     {/* Admin Demo Login */}
//                     <Button
//                         type="button"
//                         variant="outline"
//                         className="w-full"
//                         size="lg"
//                         onClick={handleAdminDemo}
//                         disabled={isLoading}
//                     >
//                         <Shield className="h-4 w-4 mr-2" />
//                         Demo: Login as Admin
//                     </Button>
//
//                     <div className="text-center text-sm text-muted-foreground">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-primary font-medium hover:underline">
//                             Sign up
//                         </Link>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }