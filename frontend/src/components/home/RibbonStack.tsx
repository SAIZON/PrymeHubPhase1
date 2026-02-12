import { useEffect, useState } from "react";
import { Gift, Tag, Percent } from "lucide-react";

const offers = [
  { id: 1, text: "Get ₹500 Cashback on HDFC Loans", icon: Gift, code: null },
  { id: 2, text: "Zero Processing Fee - Code: PRYME2025", icon: Tag, code: "PRYME2025" },
  { id: 3, text: "Special 0.25% Lower Interest on SBI Home Loans", icon: Percent, code: null },
  { id: 4, text: "Instant Approval on Personal Loans up to ₹10 Lakhs", icon: Gift, code: null },
];

export function RibbonStack() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentOffer = offers[currentIndex];

  return (
    <div className="bg-accent text-accent-foreground overflow-hidden">
      <div className="container py-2.5">
        <div className="flex items-center justify-center gap-3 text-sm font-semibold animate-fade-in">
          <currentOffer.icon className="h-4 w-4 flex-shrink-0" />
          <span>{currentOffer.text}</span>
          {currentOffer.code && (
            <span className="px-2 py-0.5 bg-accent-foreground/15 rounded text-xs font-bold">
              {currentOffer.code}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
