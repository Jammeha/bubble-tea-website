"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TOTAL_STAMPS = 10;

export default function LoyaltyCardPage() {
  const [stamps, setStamps] = useState(3);
  const [reward, setReward] = useState(null);

  const addStamp = () => {
    if (stamps >= TOTAL_STAMPS) return;

    const next = stamps + 1;
    setStamps(next);

    if (next === 5) setReward("topping");
    if (next === 10) setReward("drink");
  };

  const reset = () => {
    setStamps(0);
    setReward(null);
  };

  const progress = (stamps / TOTAL_STAMPS) * 100;

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#fff7f4] p-6 relative overflow-hidden">
        {/* Floating bubbles */}
        <div className="absolute w-28 h-28 bg-pink-200/30 rounded-full blur-3xl top-16 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-[#c49080]/30 rounded-full blur-3xl bottom-20 right-16 animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-pink-300/30 rounded-full blur-3xl top-1/2 left-1/3 animate-pulse"></div>

        {/* Wallet Card */}
        <div className="w-[360px] rounded-[32px] p-6 text-white shadow-2xl bg-gradient-to-br from-[#e8638c] via-[#f4a0bc] to-[#7a4030] transform transition duration-300 hover:scale-[1.03] hover:-rotate-[0.6deg]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-bold tracking-wide">
                Bubbles Loyalty
              </h1>
              <p className="text-xs opacity-90">Sip • Stamp • Free Drink</p>
            </div>

            <div className="text-3xl">🧋</div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>
                {stamps} / {TOTAL_STAMPS}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-[#3d1c0e] transition-all duration-500"
              />
            </div>
          </div>

          {/* Stamp Grid */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {Array.from({ length: TOTAL_STAMPS }).map((_, i) => {
              const filled = i < stamps;

              return (
                <div
                  key={i}
                  className={`
                  h-11 w-11 rounded-full flex items-center justify-center
                  text-lg transition-all duration-300
                  ${
                    filled
                      ? "bg-white text-[#e8638c] scale-105 shadow-lg"
                      : "bg-white/25"
                  }
                  `}
                >
                  {filled ? "🧋" : ""}
                </div>
              );
            })}
          </div>

          {/* Rewards */}
          <div className="flex justify-between text-xs font-semibold mb-5">
            <div
              className={`px-3 py-1 rounded-full ${
                stamps >= 5 ? "bg-white text-[#e8638c]" : "bg-white/25"
              }`}
            >
              ⭐ Free Topping
            </div>

            <div
              className={`px-3 py-1 rounded-full ${
                stamps >= 10 ? "bg-white text-[#3d1c0e]" : "bg-white/25"
              }`}
            >
              🎉 Free Drink
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={addStamp}
              disabled={stamps >= TOTAL_STAMPS}
              className="flex-1 bg-white text-[#e8638c] font-bold py-3 rounded-xl hover:scale-105 active:scale-95 transition"
            >
              + Add Stamp
            </button>

            <button
              onClick={reset}
              className="px-4 py-3 bg-[#3d1c0e]/80 rounded-xl font-semibold hover:bg-[#3d1c0e] transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Reward Popup */}
        {reward && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl w-[320px] animate-[pop_0.35s_ease]">
              <div className="text-6xl mb-3">
                {reward === "drink" ? "🎉" : "⭐"}
              </div>

              <h2 className="text-2xl font-bold text-[#3d1c0e] mb-2">
                {reward === "drink" ? "Free Drink!" : "Free Topping!"}
              </h2>

              <p className="text-[#7a4030] mb-6">
                {reward === "drink"
                  ? "Your 10th drink is on us!"
                  : "You earned a free topping!"}
              </p>

              <button
                onClick={() => setReward(null)}
                className="w-full bg-[#e8638c] text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition"
              >
                Awesome 🎊
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
