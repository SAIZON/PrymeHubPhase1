import { Link } from "react-router-dom";

const footerLinks = {
    products: [
        { name: "Home Loans", path: "/home-loans" },
        { name: "Personal Loans", path: "/personal-loans" },
        { name: "Business Loans", path: "/business-loans" },
        { name: "Credit Cards", path: "/credit-cards" },
    ],
    resources: [
        { name: "EMI Calculator", path: "/calculators" },
        { name: "Eligibility Check", path: "/eligibility" },
        { name: "Compare Loans", path: "/compare" },
        { name: "Blog", path: "/blog" },
    ],
    company: [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Partners", path: "/partners" },
    ],
    legal: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        {/* FIXED: Removed the outer <Link> wrapper here */}
                        <div className="flex items-center gap-2 mb-4">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                                    <img
                                        src="/favicon.ico"
                                        alt="PRYME logo"
                                        className="h-5 w-5"
                                    />
                                </div>
                                <span className="text-xl font-bold text-foreground">PRYME</span>
                            </Link>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your trusted partner for finding the perfect loan. Compare offers from top banks instantly.
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Products</h4>
                        <ul className="space-y-3">
                            {footerLinks.products.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} PRYME. All rights reserved.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Developed by <span className="font-medium text-foreground">Sun IT Services</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}