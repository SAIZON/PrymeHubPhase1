import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    CreditCard,
    Building2,
    PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isAdmin, logout, getCurrentUser } from "@/service/auth"; // FIXED IMPORT
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Check Admin Access
    useEffect(() => {
        const checkAccess = () => {
            const user = getCurrentUser();

            if (!user) {
                toast({
                    variant: "destructive",
                    title: "Access Denied",
                    description: "Please login to access the admin area.",
                });
                navigate("/");
                return;
            }

            if (!isAdmin()) {
                toast({
                    variant: "destructive",
                    title: "Access Denied",
                    description: "You do not have administrative privileges.",
                });
                navigate("/dashboard"); // Redirect to user dashboard
            }
        };

        checkAccess();
    }, [navigate, toast]);

    // Handle Resize for Mobile Sidebar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
                setIsSidebarOpen(false);
            } else {
                setIsMobile(false);
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: FileText, label: "Leads", path: "/admin/leads" },
        { icon: FileText, label: "User Apps", path: "/admin/user-applications" },
        { icon: Building2, label: "Banks", path: "/admin/banks" },
        { icon: CreditCard, label: "Loan Offers", path: "/admin/offers" },
        { icon: FileText, label: "Blog Posts", path: "/admin/blogs" }, // Changed from Users to FileText for blogs
        // { icon: Users, label: "Users", path: "/admin/users" }, // Uncomment if you have a users page
        { icon: Settings, label: "Settings", path: "/admin/settings" },
    ];

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                    !isSidebarOpen && "-translate-x-full lg:hidden"
                )}
            >
                <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
                    <span className="text-xl font-bold">PrymeAdmin</span>
                    {isMobile && (
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="text-white">
                            <X className="h-5 w-5" />
                        </Button>
                    )}
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Button
                                key={item.path}
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-3",
                                    isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
                                )}
                                onClick={() => navigate(item.path)}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Button>
                        );
                    })}

                    <div className="pt-8 mt-8 border-t border-slate-800">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-slate-800"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </Button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-16 bg-white border-b flex items-center justify-between px-6 lg:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    <span className="font-semibold">Admin Panel</span>
                </header>

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}