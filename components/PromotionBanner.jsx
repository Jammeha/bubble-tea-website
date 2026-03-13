"use client";

import { useState, useEffect } from "react";

const PROMOTIONS = [
  {
    id: 1,
    text: "Eid Special Sale! Get a FREE topping with every order.",
    icon: "🌙",
    // This promotion is active for March 2026 (Eid is predicted around March 21-22 in 2026)
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-31"),
  },
  {
    id: 2,
    text: "Free Delivery on orders over $50 at Senegambia & Latrikunda!",
    icon: "🛵",
    startDate: null, // Always active
    endDate: null,
  },
  {
    id: 3,
    text: "New Flavor Alert: Try our new Rose Milk Tea!",
    icon: "🧋",
    startDate: null,
    endDate: null,
  },
];

const PromotionBanner = () => {
  const [index, setIndex] = useState(0);
  const [visiblePromos, setVisiblePromos] = useState([]);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Filter promotions by date
    const now = new Date();
    const active = PROMOTIONS.filter((promo) => {
      const starts = promo.startDate ? now >= promo.startDate : true;
      const ends = promo.endDate ? now <= promo.endDate : true;
      return starts && ends;
    });
    setVisiblePromos(active);
  }, []);

  useEffect(() => {
    if (visiblePromos.length <= 1) return;

    const interval = setInterval(() => {
      // Small fade effect
      setOpacity(0);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % visiblePromos.length);
        setOpacity(1);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [visiblePromos]);

  if (visiblePromos.length === 0) return null;

  const currentPromo = visiblePromos[index];

  return (
    <div className="bg-[#4B2E2E] text-[#F7D9DC] py-2 px-6 text-center text-sm font-black uppercase tracking-widest h-10 flex items-center justify-center overflow-hidden border-b border-[#4B2E2E]/10 relative z-[60]">
      <div 
        className="transition-opacity duration-500 ease-in-out flex items-center justify-center gap-2"
        style={{ opacity }}
      >
        <span className="inline-block">{currentPromo.icon}</span>
        <span>{currentPromo.text}</span>
        <span className="inline-block">{currentPromo.icon}</span>
      </div>
    </div>
  );
};

export default PromotionBanner;

