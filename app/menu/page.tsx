"use client";

import { useState, useEffect } from "react";
import { drinks } from "@/components/drink/drinks";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
export default function MenuPage() {
  const [category, setCategory] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const categories = ["all", "bubble", "waffle", "ice", "matcha"];
  const filtered =
    category === "all"
      ? drinks
      : drinks.filter((d) => (d.category || "") === category);

  return (
    <>
      <Navbar />

      <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#FDF4F6] to-[#FFEFF2]">
        <div className="text-center mb-16">
          <h2 className="text-[#E88997] uppercase tracking-widest font-semibold mb-2">
            Delights for Every Mood
          </h2>
          <h1 className="text-6xl md:text-7xl font-extrabold text-[#4B2E2E]">
            Our Premium Menu
          </h1>
        </div>

        <div className="flex justify-center gap-4 flex-wrap mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition transform ${
                category === cat
                  ? "bg-[#4B2E2E] text-white shadow-xl scale-105"
                  : "bg-pink-100 text-[#4B2E2E] hover:bg-pink-200"
              }`}
            >
              {cat === "all"
                ? "All"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          {filtered.map((drink) => (
            <Link key={drink.id} href={`/menu/${drink.slug}`} className="group">
              <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-2 transition cursor-pointer">
                <div className="relative w-full h-[240px] mb-4">
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    className="object-contain group-hover:scale-110 transition"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#4B2E2E] text-center mb-2">
                  {drink.name}
                </h3>
                <p className="text-[#E88997] text-center text-lg font-semibold mb-4">
                  ${drink.price}
                </p>
                {/* ✅ Replaced Add to Cart with View Drink */}
                <div className="w-full bg-[#4B2E2E] text-white py-2 rounded-full text-center hover:bg-[#5C3B3B] transition">
                  View Drink →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
