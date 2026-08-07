"use client";

import { useState, useEffect } from "react";
import { generalSettings } from "@/app/data/general";

const PromotionBanner = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const messages = generalSettings.specialOfferTexts || [];

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  if (!messages.length) return null;

  return (
    <div className="bg-[#4B2E2E] text-[#F7D9DC] py-2 px-6 text-center text-[10px] md:text-sm font-black uppercase tracking-widest h-10 flex items-center justify-center overflow-hidden border-b border-[#4B2E2E]/10 relative z-20">
      <div 
        key={currentIndex}
        className="flex items-center justify-center gap-2 animate-fadeIn"
      >
        <span className="inline-block animate-pulse">✨</span>
        <span>{messages[currentIndex]}</span>
        <span className="inline-block animate-pulse">✨</span>
      </div>
    </div>
  );
};

export default PromotionBanner;
