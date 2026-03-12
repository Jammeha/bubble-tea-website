"use client";
import { useState, use } from "react";
import { drinks } from "@/components/drink/drinks";
import { toppings } from "@/app/data/toppings";
import { sizes, sweetnessLevels, iceLevels } from "@/app/data/options";
import { useCart } from "@/components/context/CartContext";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DrinkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const drink = drinks.find((d) => d.slug === slug);
  const { addToCart } = useCart();
  const router = useRouter();

  const [size, setSize] = useState(sizes[0]);
  const [sweetness, setSweetness] = useState("100%");
  const [ice, setIce] = useState("Regular Ice");
  const [selectedTopping, setSelectedTopping] = useState<
    (typeof toppings)[0] | null
  >(null);
  const [added, setAdded] = useState(false);

  if (!drink) return <div className="p-10">Drink not found</div>;

  const toppingsPrice = selectedTopping ? selectedTopping.price : 0;
  const total = (drink.price || 0) + (size.price || 0) + toppingsPrice;

  const handleAddToCart = () => {
    addToCart({
      id: `${drink.id}-${size.name}-${selectedTopping?.id || "no-topping"}`,
      name: drink.name,
      image: drink.image,
      size: size.name,
      sweetness,
      ice,
      toppings: selectedTopping ? [selectedTopping] : [],
      price: total,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#FDF4F6] to-[#FFEFF2]">
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#4B2E2E] font-semibold hover:gap-3 transition-all"
          >
            ← Back to Menu
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT — Drink Image */}
          <div className="relative flex flex-col items-center">
            <div className="absolute w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40 top-10" />
            <div className="relative z-10 w-full max-w-sm">
              <Image
                src={drink.image}
                alt={drink.name}
                width={420}
                height={420}
                className="object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
              />
            </div>
            <div className="relative z-10 flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${i < Math.floor(drink.rating || 4) ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
              <span className="text-sm text-gray-500 ml-1">
                ({drink.rating || 4.5})
              </span>
            </div>
          </div>

          {/* RIGHT — Customization */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[#E88997] uppercase tracking-widest text-sm font-semibold">
                {drink.category || "Bubble Tea"}
              </span>
              <h1 className="text-5xl font-extrabold text-[#4B2E2E] mt-1 leading-tight">
                {drink.name}
              </h1>
              <p className="text-gray-500 mt-3 text-lg leading-relaxed">
                {drink.description}
              </p>
              <p className="text-[#E88997] text-3xl font-bold mt-3">
                ${drink.price.toFixed(2)}
              </p>
            </div>

            {/* Size */}
            <div>
              <h2 className="text-lg font-bold text-[#4B2E2E] mb-3">
                Choose Size
              </h2>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSize(s)}
                    className={`px-5 py-2.5 rounded-full font-semibold border-2 transition ${
                      size.name === s.name
                        ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-lg scale-105"
                        : "bg-white text-[#4B2E2E] border-pink-200 hover:border-[#4B2E2E]"
                    }`}
                  >
                    {s.name}
                    {s.price > 0 && (
                      <span className="ml-1 text-xs opacity-70">
                        +${s.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness & Ice */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#4B2E2E] mb-2">
                  🍬 Sweetness
                </h2>
                <select
                  value={sweetness}
                  onChange={(e) => setSweetness(e.target.value)}
                  className="w-full p-3 border-2 border-pink-200 rounded-xl bg-white text-[#4B2E2E] font-medium focus:outline-none focus:border-[#4B2E2E]"
                >
                  {sweetnessLevels.map((level) => (
                    <option key={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#4B2E2E] mb-2">
                  🧊 Ice Level
                </h2>
                <select
                  value={ice}
                  onChange={(e) => setIce(e.target.value)}
                  className="w-full p-3 border-2 border-pink-200 rounded-xl bg-white text-[#4B2E2E] font-medium focus:outline-none focus:border-[#4B2E2E]"
                >
                  {iceLevels.map((level) => (
                    <option key={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Toppings — single select */}
            <div>
              <h2 className="text-lg font-bold text-[#4B2E2E] mb-3">
                🧋 Topping{" "}
                <span className="text-sm font-normal text-gray-400">
                  (pick one)
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {toppings.map((t) => {
                  const isSelected = selectedTopping?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopping(isSelected ? null : t)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 font-medium transition ${
                        isSelected
                          ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-md"
                          : "bg-white text-[#4B2E2E] border-pink-200 hover:border-[#4B2E2E]"
                      }`}
                    >
                      <span>{t.name}</span>
                      <span
                        className={`text-sm ${isSelected ? "text-pink-200" : "text-[#E88997]"}`}
                      >
                        +${t.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total + Add to Cart */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-pink-100">
              <div className="flex flex-col gap-1 mb-4 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Base price</span>
                  <span>${drink.price.toFixed(2)}</span>
                </div>
                {size.price > 0 && (
                  <div className="flex justify-between">
                    <span>Size ({size.name})</span>
                    <span>+${size.price.toFixed(2)}</span>
                  </div>
                )}
                {selectedTopping && (
                  <div className="flex justify-between">
                    <span>{selectedTopping.name}</span>
                    <span>+${selectedTopping.price.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-1 flex justify-between font-bold text-[#4B2E2E] text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                  added
                    ? "bg-green-500 text-white scale-95"
                    : "bg-[#4B2E2E] text-white hover:bg-[#5C3B3B] hover:scale-105 shadow-lg"
                }`}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart 🧋"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
