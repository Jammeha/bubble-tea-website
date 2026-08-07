"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { sizes as localSizes, sweetnessLevels as localSweetness, iceLevels as localIce } from "@/app/data/options";
import { toppings as localToppings } from "@/app/data/toppings";

interface DrinkModalProps {
  drink: any | null;
  onClose: () => void;
}

export default function DrinkModal({ drink, onClose }: DrinkModalProps) {
  const [selectedSize, setSelectedSize] = useState<any>(localSizes[0] || { name: "Regular", price: 0 });
  const [selectedSweetness, setSelectedSweetness] = useState<string>("100%");
  const [selectedIce, setSelectedIce] = useState<string>("Regular Ice");
  const [selectedTopping, setSelectedTopping] = useState<any>(null);

  useEffect(() => {
    if (drink) {
      setSelectedSize(localSizes[0] || { name: "Regular", price: 0 });
      setSelectedSweetness("100%");
      setSelectedIce("Regular Ice");
      setSelectedTopping(null);
    }
  }, [drink]);

  if (!drink) return null;

  const categoryName = drink.category?.name || drink.category?.attributes?.name || "Bubble Tea";
  const isSnack = categoryName?.toLowerCase() === "snacks";
  const basePrice = drink.price || 0;
  const sizePrice = selectedSize?.price || 0;
  const toppingPrice = selectedTopping ? (selectedTopping.price || 0) : 0;
  const totalPrice = basePrice + sizePrice + toppingPrice;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#FDF4F6] rounded-[2.5rem] p-6 md:p-8 border-2 border-[#E88997]/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-[#4B2E2E] hover:text-white text-[#4B2E2E] flex items-center justify-center font-bold text-xl transition-all shadow-md"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto pr-1 custom-scrollbar space-y-6">
          
          {/* Header & Image */}
          <div className="flex flex-col md:flex-row items-center gap-6 border-b border-[#4B2E2E]/10 pb-6">
            <div className="relative w-44 h-44 flex-shrink-0 bg-white/60 rounded-3xl p-4 border border-pink-100 shadow-inner flex items-center justify-center">
              <div className="absolute inset-0 bg-[#E88997]/20 rounded-3xl blur-xl opacity-60"></div>
              {drink.image ? (
                <Image
                  src={drink.image}
                  alt={drink.name}
                  width={160}
                  height={160}
                  className="object-contain relative z-10 drop-shadow-md"
                />
              ) : (
                <span className="text-6xl">🧋</span>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="text-[#E88997] text-xs font-black uppercase tracking-[0.2em]">
                {categoryName}
              </span>
              <h2 className="text-3xl font-black text-[#4B2E2E] mt-1 tracking-tight">
                {drink.name}
              </h2>
              {drink.description && (
                <p className="text-[#6B4B4B] text-sm mt-2 leading-relaxed font-medium">
                  {drink.description}
                </p>
              )}
              <div className="mt-3 flex items-center justify-center md:justify-start gap-2">
                <span className="text-2xl font-black text-[#4B2E2E]">
                  D{totalPrice.toFixed(2)}
                </span>
                {sizePrice > 0 || toppingPrice > 0 ? (
                  <span className="text-xs text-gray-500 font-semibold">
                    (Base D{basePrice.toFixed(2)})
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Size Selection */}
          {!isSnack && localSizes.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase text-[#4B2E2E] tracking-wider mb-2.5 flex items-center gap-2">
                <span>🥤</span> Choose Size
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {localSizes.map((s: any) => {
                  const isSelected = selectedSize?.name === s.name;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSize(s)}
                      className={`py-3 px-4 rounded-2xl font-bold text-sm border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-md scale-[1.02]"
                          : "bg-white text-[#4B2E2E] border-pink-200 hover:border-[#E88997]"
                      }`}
                    >
                      <span>{s.name}</span>
                      {s.price > 0 && (
                        <span className={`text-xs ${isSelected ? "text-pink-200" : "text-[#E88997]"}`}>
                          +D{s.price}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sweetness Selection */}
          {!isSnack && (
            <div>
              <h3 className="text-sm font-black uppercase text-[#4B2E2E] tracking-wider mb-2.5 flex items-center gap-2">
                <span>🍬</span> Sweetness Level
              </h3>
              <div className="flex flex-wrap gap-2">
                {localSweetness.map((level: string) => {
                  const isSelected = selectedSweetness === level;
                  return (
                    <button
                      key={level}
                      onClick={() => setSelectedSweetness(level)}
                      className={`flex-1 min-w-[60px] py-2.5 rounded-2xl font-bold text-sm border-2 transition-all text-center ${
                        isSelected
                          ? "bg-[#E88997] text-[#4B2E2E] border-[#E88997] shadow-md scale-105"
                          : "bg-white text-[#4B2E2E] border-pink-200 hover:border-[#E88997]"
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ice Level Selection */}
          {!isSnack && (
            <div>
              <h3 className="text-sm font-black uppercase text-[#4B2E2E] tracking-wider mb-2.5 flex items-center gap-2">
                <span>🧊</span> Ice Level
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {localIce.map((level: string) => {
                  const isSelected = selectedIce === level;
                  return (
                    <button
                      key={level}
                      onClick={() => setSelectedIce(level)}
                      className={`py-2.5 px-2 rounded-2xl font-bold text-xs md:text-sm border-2 transition-all text-center ${
                        isSelected
                          ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-md"
                          : "bg-white text-[#4B2E2E] border-pink-200 hover:border-[#E88997]"
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tapioca & Toppings Selection */}
          {!isSnack && localToppings.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase text-[#4B2E2E] tracking-wider mb-2.5 flex items-center gap-2">
                <span>🧋</span> Add Topping / Tapioca
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {localToppings.map((t: any) => {
                  const isSelected = selectedTopping?.name === t.name;
                  return (
                    <button
                      key={t.id || t.name}
                      onClick={() => setSelectedTopping(isSelected ? null : t)}
                      className={`p-3 rounded-2xl font-bold text-xs md:text-sm border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-md scale-105"
                          : "bg-white text-[#4B2E2E] border-pink-200 hover:border-[#E88997]"
                      }`}
                    >
                      <span className="text-center">{t.name}</span>
                      <span className={`text-[11px] font-black ${isSelected ? "text-pink-200" : "text-[#E88997]"}`}>
                        +D{t.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary / Close Footer */}
          <div className="pt-4 border-t border-[#4B2E2E]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase font-bold text-[#4B2E2E]/60 block">Calculated Price</span>
              <span className="text-2xl font-black text-[#4B2E2E]">D{totalPrice.toFixed(2)}</span>
            </div>
            
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#4B2E2E] text-white font-black text-sm uppercase tracking-wider rounded-full hover:bg-[#E88997] hover:text-[#4B2E2E] transition-all duration-300 shadow-lg"
            >
              Done Previewing ✓
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
