"use client";

import { useState, useEffect } from "react";
import { drinks } from "@/components/drink/drinks";
import { getActiveDrinks } from "@/utils/seasonalFilter";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
export default function MenuPage() {
  const [category, setCategory] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const categories = ["all", "milktea", "fruittea", "specials"];
  const activeDrinks = getActiveDrinks(drinks);
  const filtered =
    category === "all"
      ? activeDrinks
      : activeDrinks.filter((d) => (d.category || "") === category);

  const getCategoryName = (cat: string) => {
    switch(cat) {
      case "all": return "Shop All";
      case "milktea": return "Milk Tea";
      case "fruittea": return "Fruit Tea";
      case "specials": return "Specials";
      default: return cat;
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen py-24 px-6 bg-[#FDF4F6] relative overflow-hidden">
        {/* Soft Decorative Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F7D9DC] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#EEC1C8] rounded-full blur-[100px] opacity-30"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-[#E88997] uppercase tracking-[0.3em] text-sm font-bold mb-4">
              Delights for Every Mood
            </h2>
            <h1 className="text-6xl md:text-8xl font-black text-[#4B2E2E] tracking-tight">
              Our <span className="text-[#E88997]">Menu</span>
            </h1>
          </div>

          {/* Premium Glassmorphic Category Bar */}
          <div className="flex justify-center mb-20">
            <div className="inline-flex bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/60 shadow-xl overflow-hidden touch-pan-x">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-500 whitespace-nowrap ${
                    category === cat
                      ? "bg-[#4B2E2E] text-white shadow-lg translate-y-[-1px]"
                      : "text-[#4B2E2E]/70 hover:text-[#4B2E2E] hover:bg-white/20"
                  }`}
                  suppressHydrationWarning
                >
                  {getCategoryName(cat)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {filtered.map((drink) => (
              <Link key={drink.id} href={`/menu/${drink.slug}`} className="group relative">
                <div className="h-full bg-[#4B2E2E] rounded-[2.5rem] p-8 pb-10 border border-[#5C3B3B] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_40px_80px_rgba(75,46,46,0.3)] transition-all duration-500 hover:-translate-y-3 flex flex-col items-center">
                  
                  {/* Special Badge (Bestseller or Seasonal) */}
                  {(drink as any).isSpecial && (
                    <div className="absolute top-6 left-0 bg-[#E88997] text-[#4B2E2E] py-1.5 px-6 rounded-r-full text-[0.65rem] font-black uppercase tracking-[0.15em] z-20 shadow-lg">
                      Bestseller
                    </div>
                  )}
                  {(drink as any).seasonal && (
                    <div className="absolute top-6 left-0 bg-[#4B2E2E] text-white py-1.5 px-6 rounded-r-full text-[0.65rem] font-black uppercase tracking-[0.15em] z-20 shadow-lg border-l-4 border-[#E88997]">
                      {(drink as any).seasonLabel || "Special"}
                    </div>
                  )}

                  {/* Drink Image Container with Glow */}
                  <div className="relative w-full aspect-square mb-8 flex justify-center items-center">
                    <div className="absolute w-[80%] h-[80%] bg-pink-400/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative w-[110%] h-[110%] group-hover:scale-110 transition-transform duration-700 ease-out">
                      <Image
                        src={drink.image}
                        alt={drink.name}
                        fill
                        className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)]"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center w-full mt-auto text-white">
                    <span suppressHydrationWarning className="text-[#E88997] text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-2 block">
                      {drink.category || "Original"}
                    </span>
                    <h3 className="text-2xl font-black leading-tight mb-2 tracking-tight">
                      {drink.name}
                    </h3>
                    {(drink as any).offerLabel && (
                      <p className="text-[#E88997] text-xs font-bold uppercase tracking-wider mb-2">
                        {(drink as any).offerLabel}
                      </p>
                    )}
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <div className="h-[1px] w-4 bg-[#E88997]/50"></div>
                      <p suppressHydrationWarning className="text-[#E88997] text-xl font-black">
                        D{drink.price}
                      </p>
                      <div className="h-[1px] w-4 bg-[#E88997]/50"></div>
                    </div>

                    <div suppressHydrationWarning className="inline-flex items-center justify-center bg-[#E88997] text-[#4B2E2E] px-10 py-4 rounded-full text-sm font-bold hover:bg-white transition-all duration-300 shadow-md transform group-hover:scale-105 active:scale-95 mb-2">
                       Explore Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
