"use client";
import { useState } from "react";
import { categories as localCategories } from "@/app/data/categories";
import { drinks as localDrinks } from "@/app/data/drinks";
import { useCart } from "@/components/context/CartContext";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function MenuPage() {
  const [category, setCategory] = useState("all");
  const categories = localCategories;
  const drinks = localDrinks;
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart() as any;

  // Simulate loading if desired, but here we can just show data
  const loading = false;

  if (loading) return (
    <div className="min-h-screen bg-[#FDF4F6] flex items-center justify-center">
      <div className="text-[#4B2E2E] font-black text-2xl animate-bounce">Bubbling up the menu...</div>
    </div>
  );

  const getCategoryName = (cat: string) => {
    if (cat === "all") return "Shop All";
    return cat;
  };

  const activeDrinks = drinks.filter((item: any) => {
    const drink = item.attributes || item;
    // You could add seasonal logic here if needed
    return true; 
  });

  const filtered = category === "all"
    ? drinks
    : drinks.filter((drink: any) => {
        const drinkCat = drink.category?.name;
        return drinkCat === category;
      });

  // REMOVED 8-ITEM LIMIT
  const limitedDrinks = filtered;

  const handleQuickAdd = (e: React.MouseEvent, item: any) => {
    const drink = item.attributes || item;
    const drinkId = item.documentId || item.id;
    
    // Only allow quick add for snacks
    const categoryName = drink.category?.attributes?.name || drink.category?.name;
    if (categoryName?.toLowerCase() !== "snacks") return;
    
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: `${drink.id}-regular-none`,
      name: drink.name,
      image: drink.image,
      size: "Regular",
      sweetness: "100%",
      ice: "Regular Ice",
      toppings: [],
      price: drink.price,
      qty: 1,
    });

    setAddedId(drink.id);
    setTimeout(() => setAddedId(null), 2000);
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
            <div className="inline-flex bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/60 shadow-xl overflow-x-auto flex-nowrap max-w-full touch-pan-x no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-500 whitespace-nowrap ${
                    category === cat
                      ? "bg-[#4B2E2E] text-white shadow-lg translate-y-[-1px]"
                      : "text-[#4B2E2E]/70 hover:text-[#4B2E2E] hover:bg-white/20"
                  }`}
                >
                  {getCategoryName(cat)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {filtered.map((drink: any) => {
              const drinkId = drink.id;
              const imageUrl = drink.image;
              const categoryName = drink.category?.name;
              const isSnack = categoryName?.toLowerCase() === "snacks";

              const CardContent = (
                <div className="h-full bg-[#4B2E2E] rounded-[2.5rem] p-8 pb-10 border border-[#5C3B3B] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_40px_80px_rgba(75,46,46,0.3)] transition-all duration-500 hover:-translate-y-3 flex flex-col items-center">
                  
                  {/* Special Badge */}
                  {drink.isSpecial && (
                    <div className="absolute top-6 left-0 bg-[#E88997] text-[#4B2E2E] py-1.5 px-6 rounded-r-full text-[0.65rem] font-black uppercase tracking-[0.15em] z-20 shadow-lg">
                      Bestseller
                    </div>
                  )}
                  {drink.seasonal && (
                    <div className="absolute top-6 left-0 bg-[#E88997] text-[#4B2E2E] py-1.5 px-6 rounded-r-full text-[0.65rem] font-black uppercase tracking-[0.15em] z-20 shadow-lg border-l-4 border-[#4B2E2E]">
                      {drink.seasonLabel || "Special"}
                    </div>
                  )}

                  {/* Drink Image */}
                  <div className="relative w-full aspect-square mb-8 flex justify-center items-center">
                    <div className="absolute w-[80%] h-[80%] bg-pink-400/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative w-[110%] h-[110%] group-hover:scale-110 transition-transform duration-700 ease-out">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={drink.name}
                          fill
                          className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)]"
                        />
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center w-full mt-auto text-white">
                    <span className="text-[#E88997] text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-2 block">
                      {categoryName || "Original"}
                    </span>
                    <h3 className="text-2xl font-black leading-tight mb-2 tracking-tight">
                      {drink.name}
                    </h3>
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <div className="h-[1px] w-4 bg-[#E88997]/50"></div>
                      <p className="text-[#E88997] text-xl font-black">
                        D{drink.price}
                      </p>
                      <div className="h-[1px] w-4 bg-[#E88997]/50"></div>
                    </div>

                    <div 
                      className={`inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-bold transition-all duration-300 shadow-md transform group-hover:scale-105 active:scale-95 mb-2 ${
                        addedId === drinkId 
                          ? "bg-green-500 text-white" 
                          : "bg-[#E88997] text-[#4B2E2E] hover:bg-white"
                      }`}
                    >
                       {isSnack 
                         ? (addedId === drinkId ? "Added! ✓" : "Quick Add 🧋")
                         : "Explore Details"}
                    </div>
                  </div>
                </div>
              );

              return isSnack ? (
                <div 
                  key={drinkId} 
                  onClick={(e) => handleQuickAdd(e, drink)} 
                  className="group relative cursor-pointer"
                >
                  {CardContent}
                </div>
              ) : (
                <Link key={drinkId} href={`/menu/${drink.slug}`} className="group relative">
                  {CardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
