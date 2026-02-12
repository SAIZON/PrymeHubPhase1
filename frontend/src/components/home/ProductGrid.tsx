import { Link } from "react-router-dom";
import { Home, User, Briefcase, RefreshCw, CreditCard, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Home Loans",
    description: "Get your dream home with competitive rates",
    icon: Home,
    path: "/home-loans",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Personal Loans",
    description: "Quick funds for all your personal needs",
    icon: User,
    path: "/personal-loans",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    id: 3,
    name: "Business Loans",
    description: "Fuel your business growth with easy credit",
    icon: Briefcase,
    path: "/business-loans",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    id: 4,
    name: "Loan Transfer",
    description: "Switch to better rates and save money",
    icon: RefreshCw,
    path: "/loan-transfer",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: 5,
    name: "Credit Cards",
    description: "Exclusive cards with amazing rewards",
    icon: CreditCard,
    path: "/credit-cards",
    gradient: "from-rose-500 to-rose-600",
  },
];

export function ProductGrid() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Our Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from a wide range of financial products tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={product.path}>
              <Card className="group h-full border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} mb-4`}
                  >
                    <product.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
