import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { User, logout, getCurrentUser } from "@/service/auth";
import { cn } from "@/lib/utils"; // Ensure you have this utility or remove cn usage

// FIXED: Named export to match PublicLayout import { Header }
export function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate("/");
        window.location.reload();
    };

    const handleLoginSuccess = () => {
        const storedUser = getCurrentUser();
        if (storedUser) setUser(storedUser);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
                    <span className="text-primary">Pryme</span>Hub
                </Link>

                {/* Desktop Navigation - Expanded with missing links */}
                <div className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="/" className={navigationMenuTriggerStyle()}>
                                    Home
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link to="/products" className={navigationMenuTriggerStyle()}>
                                    Loans
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <ListItem href="/services" title="All Services">
                                            Explore our full range of financial services.
                                        </ListItem>
                                        <ListItem href="/compare" title="Compare Loans">
                                            Compare interest rates and features.
                                        </ListItem>
                                        <ListItem href="/eligibility" title="Check Eligibility">
                                            See if you qualify for a loan instantly.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        <ListItem href="/calculators" title="Calculators">
                                            EMI, Eligibility, and Affordability calculators.
                                        </ListItem>
                                        <ListItem href="/blog" title="Blog">
                                            Latest financial news and tips.
                                        </ListItem>
                                        <ListItem href="/partners" title="Partners">
                                            Our banking and financial partners.
                                        </ListItem>
                                        <ListItem href="/about" title="About Us">
                                            Learn more about PrymeHub.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link to="/contact" className={navigationMenuTriggerStyle()}>
                                    Contact
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Auth Section */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="" alt={user.name} />
                                        <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate("/profile")}>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden md:block">
                            <AuthModal onLoginSuccess={handleLoginSuccess} />
                        </div>
                    )}

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-4 p-4">
                                    <Link to="/" className="text-lg font-medium">Home</Link>
                                    <Link to="/products" className="text-lg font-medium">Loans</Link>
                                    <Link to="/services" className="text-lg font-medium">Services</Link>
                                    <Link to="/calculators" className="text-lg font-medium">Calculators</Link>
                                    <Link to="/blog" className="text-lg font-medium">Blog</Link>
                                    <Link to="/contact" className="text-lg font-medium">Contact</Link>
                                    {!user && (
                                        <div className="pt-4">
                                            <AuthModal onLoginSuccess={handleLoginSuccess} />
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}

// Helper component for Navigation Menu Links
import React from "react";
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"