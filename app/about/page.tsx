"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Coffee, Sparkles, Heart } from "lucide-react";
import { generalSettings as content } from "@/app/data/general";

export default function AboutPage() {
  const loading = false;

  return (
    <>
      <div className="bg-[#FDF4F6] min-h-screen font-sans">
        <Navbar />

        {/* --- Premium Hero --- */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-20" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-[#E88997] uppercase tracking-[0.3em] font-bold text-sm mb-4">
              {content?.aboutEssence || "Our Essence"}
            </h2>
            <h1 className="text-6xl md:text-7xl font-extrabold text-[#4B2E2E] leading-tight">
              Happiness in <span className="text-[#E88997]">Every Sip</span>
            </h1>
            <p className="mt-8 text-xl text-[#6B4B4B] leading-relaxed">
              At Bubbles, we believe bubble tea is more than just a drink—it&apos;s a handcrafted 
              moment of joy. We blend traditional techniques with modern flavors to create 
              the perfect escape in every cup.
            </p>
          </div>
        </section>

        {/* --- Our Story & Visual --- */}
        <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center px-6 py-12">
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#E88997] rounded-3xl rotate-3 group-hover:rotate-1 transition-transform duration-500 shadow-xl" />
              <div className="relative bg-white p-4 rounded-3xl shadow-lg">
                <Image
                  src="/classic.png"
                  alt="Crafting Bubble Tea"
                  width={600}
                  height={600}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-4xl font-black text-[#4B2E2E]">Our Journey</h2>
            <div className="space-y-6 text-[#6B4B4B] text-lg leading-relaxed whitespace-pre-line">
              {content?.aboutStory ? (
                <p>{content.aboutStory}</p>
              ) : (
                <>
                  <p>
                    Bubbles was born from a simple passion: to bring the authentic, 
                    premium bubble tea experience to the heart of the Gambia. What started 
                    as a dream of finding the perfect &quot;chew&quot; in a pearl has grown 
                    into a community of tea lovers.
                  </p>
                  <p>
                    Every morning, we brew high-grade tea leaves and prepare our 
                    signature toppings from scratch. For us, quality is non-negotiable. 
                    Whether you visit us at **Tropic Mall** or **Latrikunda**, you&apos;re 
                    stepping into a world where flavor meets craft.
                  </p>
                </>
              )}
            </div>
            <div className="pt-4">
              <Link href="/menu">
                <button className="bg-[#4B2E2E] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-xl flex items-center gap-3">
                  Discover Our Craft <Sparkles size={20} />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- Our Process: The Bubbles Difference --- */}
        <section className="bg-white py-24 mt-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#4B2E2E]">
                The Bubbles Way
              </h2>
              <div className="w-20 h-1 bg-[#E88997] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="bg-[#FDF4F6] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#E88997] group-hover:bg-[#E88997] group-hover:text-white transition duration-500">
                  <Leaf size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#4B2E2E] mb-3">Premium Leaves</h3>
                <p className="text-[#6B4B4B]">
                  We source organic, loose-leaf teas from the finest estates to ensure 
                  a deep, nuanced base for every drink.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-[#FDF4F6] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#E88997] group-hover:bg-[#E88997] group-hover:text-white transition duration-500">
                  <Coffee size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#4B2E2E] mb-3">Freshly Prepared</h3>
                <p className="text-[#6B4B4B]">
                  Our tapioca pearls are cooked every 4 hours to maintain that 
                  perfectly chewy, golden consistency.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-[#FDF4F6] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#E88997] group-hover:bg-[#E88997] group-hover:text-white transition duration-500">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#4B2E2E] mb-3">Made with Love</h3>
                <p className="text-[#6B4B4B]">
                  Every cup is customized to your preference—measured, shaken, 
                  and sealed with precision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Community --- */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#4B2E2E] to-[#2F1A17] p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A Hub for Connections
            </h2>
            <p className="text-pink-100/80 text-lg mb-8">
              Bubbles is more than a shop; it&apos;s where first dates happen, study 
              sessions fuel dreams, and friends catch up. Visit us today and experience 
              the vibe.
            </p>
            <Link href="/#contact">
              <button className="bg-[#E88997] text-[#4B2E2E] px-8 py-3 rounded-full font-bold hover:bg-white transition">
                Find Our Locations
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

