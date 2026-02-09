// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { authService } from "@/service/auth";
//
// export default function Signup() {
//     const navigate = useNavigate();
//     const { toast } = useToast();
//
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//         password: "",
//     });
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//
//         try {
//             // Connect to backend
//             await authService.register({
//                 fullName: formData.name, // Mapping 'name' to 'fullName'
//                 email: formData.email,
//                 mobile: formData.mobile,
//                 password: formData.password,
//             });
//
//             // Show success message
//             toast({
//                 title: "Account created successfully",
//                 description: "Please sign in with your new credentials.",
//             });
//
//             // Redirect to login page
//             navigate("/login");
//
//         } catch (error) {
//             // 1. Check if the error is actually an Error object to safely access .message
//             const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
//
//             toast({
//                 variant: "destructive",
//                 title: "Registration failed",
//                 description: errorMessage,
//             });
//         } finally {
//             setIsLoading(false);
//         }
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
//                     <CardTitle className="text-2xl">Create an account</CardTitle>
//                     <CardDescription>Start your journey to find the perfect loan</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="name">Full Name</Label>
//                             <div className="relative">
//                                 <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                     id="name"
//                                     name="name"
//                                     type="text"
//                                     placeholder="John Doe"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="pl-10"
//                                     required
//                                     disabled={isLoading}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="space-y-2">
//                             <Label htmlFor="email">Email</Label>
//                             <div className="relative">
//                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="name@example.com"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="pl-10"
//                                     required
//                                     disabled={isLoading}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="space-y-2">
//                             <Label htmlFor="mobile">Mobile Number</Label>
//                             <div className="relative">
//                                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                     id="mobile"
//                                     name="mobile"
//                                     type="tel"
//                                     placeholder="+91 98765 43210"
//                                     value={formData.mobile}
//                                     onChange={handleChange}
//                                     className="pl-10"
//                                     required
//                                     disabled={isLoading}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="space-y-2">
//                             <Label htmlFor="password">Password</Label>
//                             <div className="relative">
//                                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Create a strong password"
//                                     value={formData.password}
//                                     onChange={handleChange}
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
//                             {isLoading ? "Creating Account..." : "Create Account"}
//                         </Button>
//                     </form>
//
//                     <p className="mt-4 text-xs text-center text-muted-foreground">
//                         By signing up, you agree to our{" "}
//                         <Link to="/terms" className="text-primary hover:underline">
//                             Terms of Service
//                         </Link>{" "}
//                         and{" "}
//                         <Link to="/privacy" className="text-primary hover:underline">
//                             Privacy Policy
//                         </Link>
//                     </p>
//
//                     <div className="mt-6 text-center text-sm text-muted-foreground">
//                         Already have an account?{" "}
//                         <Link to="/login" className="text-primary font-medium hover:underline">
//                             Sign in
//                         </Link>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }