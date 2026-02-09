import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Index from "./pages/Index";
import Compare from "./pages/Compare";
// import {AuthModal} from "./components/auth/AuthModal.tsx";

// import Login from "../to be deleted/Login.tsx";
// import Signup from "../to be deleted/Signup.tsx";
import Dashboard from "./pages/Dashboard";
import Calculators from "./pages/Calculators";
import About from "./pages/About";
import LoanProduct from "./pages/products/LoanProduct";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBanks from "./pages/admin/ManageBanks";
import Applications from "./pages/admin/Applications";
import Offers from "./pages/admin/Offers";
import ManageBlogs from "./pages/admin/ManageBlogs";
import NotFound from "./pages/NotFound";

// New Standard Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Contact from "./pages/Contact";
import Partners from "./pages/Partners";
import EligibilityCheck from "./pages/EligibilityCheck";
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import PublicOffers from "./pages/PublicOffers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/about" element={<About />} />
            
            {/* Product Pages */}
            <Route path="/home-loans" element={<LoanProduct />} />
            <Route path="/personal-loans" element={<LoanProduct />} />
            <Route path="/business-loans" element={<LoanProduct />} />
            <Route path="/loan-transfer" element={<LoanProduct />} />
            <Route path="/credit-cards" element={<LoanProduct />} />

            {/* Standard Pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/eligibility" element={<EligibilityCheck />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/offers" element={<PublicOffers />} />
          </Route>

          {/* Auth Routes */}
          {/*<Route path="/login" element={<Login />} />*/}
          {/*<Route path="/signup" element={<Signup />} />*/}

          {/* Applicant Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="banks" element={<ManageBanks />} />
            <Route path="applications" element={<Applications />} />
            <Route path="offers" element={<Offers />} />
              <Route path="blogs" element={<ManageBlogs />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;