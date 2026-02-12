import { RibbonStack } from "@/components/home/RibbonStack";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { EMICalculator } from "@/components/home/EMICalculator";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <RibbonStack />
      <HeroSection />
      <ProductGrid />
      <EMICalculator />
      <TestimonialsCarousel />
      <CTASection />
    </div>
  );
};

export default Index;
