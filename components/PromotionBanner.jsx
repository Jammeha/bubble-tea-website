"use client";

import { generalSettings } from "@/app/data/general";

const PromotionBanner = () => {
  const promoText = generalSettings.specialOfferText;

  return (
    <div className="bg-[#4B2E2E] text-[#F7D9DC] py-2 px-6 text-center text-[10px] md:text-sm font-black uppercase tracking-widest h-10 flex items-center justify-center overflow-hidden border-b border-[#4B2E2E]/10 relative z-20">
      <div className="flex items-center justify-center gap-2">
        <span className="inline-block animate-pulse">✨</span>
        <span>{promoText}</span>
        <span className="inline-block animate-pulse">✨</span>
      </div>
    </div>
  );
};

export default PromotionBanner;

