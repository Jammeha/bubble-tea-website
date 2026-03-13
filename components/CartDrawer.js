"use client";

import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import Image from "next/image";

import { STORES, CONTACT_NUMBER } from "../constants/locations";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useCart();

  // Form state
  const [mode, setMode] = useState("delivery"); // "delivery" | "pickup"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [store, setStore] = useState(STORES[0].id);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handlePlaceOrder = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    if (!name.trim()) return alert("Please enter your full name.");
    if (!phone.trim()) return alert("Please enter your phone number.");
    if (mode === "delivery" && !address.trim())
      return alert("Please enter your delivery address.");

    const itemLines = cart
      .map((item) => {
        const toppingText =
          item.toppings && item.toppings.length > 0
            ? ` + ${item.toppings.map((t) => t.name).join(", ")}`
            : "";
        return `• ${item.name} (${item.size}, ${item.sweetness} sweet, ${item.ice}${toppingText}) x${item.qty} — D${(item.price * item.qty).toFixed(2)}`;
      })
      .join("\n");

    const fulfillment =
      mode === "delivery"
        ? `🛵 *Delivery*\nAddress: ${address}`
        : `🏪 *Pickup*\nStore: ${STORES.find((s) => s.id === store)?.label}`;

    const message =
      `🧋 *New Order from Bubbles!*\n\n` +
      `*Order:*\n${itemLines}\n\n` +
      `*Total: D${totalPrice.toFixed(2)}*\n\n` +
      `${fulfillment}\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}`;

    const url = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-white px-6 py-6 flex items-center justify-between border-b border-[#4B2E2E]/10">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#4B2E2E]">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-[#4B2E2E] hover:scale-110 transition p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[#4B2E2E]/40">
              <span className="text-5xl">🧋</span>
              <p className="text-lg font-black uppercase tracking-tighter text-[#4B2E2E]">Your cart is empty!</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 bg-[#4B2E2E] text-white px-8 py-3 rounded-full hover:bg-[#E88997] transition-all font-black uppercase text-xs tracking-widest shadow-lg"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 border-b border-[#4B2E2E]/5 pb-6">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-2xl object-cover bg-[#FDF4F6] border border-[#4B2E2E]/5"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-black uppercase tracking-tight text-[#4B2E2E] text-sm leading-tight">
                        {item.name}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#4B2E2E]/30 hover:text-red-500 transition p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[#4B2E2E] font-black text-lg mt-1">
                      D{(item.price || 0).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 border-2 border-[#4B2E2E]/10 rounded-lg text-[#4B2E2E] hover:bg-[#4B2E2E] hover:text-white transition flex items-center justify-center font-black"
                      >
                        -
                      </button>
                      <span className="font-black text-[#4B2E2E] w-4 text-center">{item.qty || 1}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 border-2 border-[#4B2E2E]/10 rounded-lg text-[#4B2E2E] hover:bg-[#4B2E2E] hover:text-white transition flex items-center justify-center font-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — Checkout Form */}
        {cart.length > 0 && (
          <div className="border-t border-[#4B2E2E]/5 px-6 py-4 bg-[#FDF4F6]/50 flex flex-col gap-2.5">

            {/* Delivery / Pickup Toggle */}
            <div className="flex rounded-xl overflow-hidden border-2 border-[#4B2E2E]/10 p-1 bg-white">
              <button
                onClick={() => setMode("delivery")}
                className={`flex-1 py-2 rounded-lg font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 ${
                  mode === "delivery"
                    ? "bg-[#4B2E2E] text-white shadow-lg scale-[1.02]"
                    : "text-[#4B2E2E] hover:bg-[#FDF4F6]"
                }`}
              >
                🛵 Delivery
              </button>
              <button
                onClick={() => setMode("pickup")}
                className={`flex-1 py-2 rounded-lg font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 ${
                  mode === "pickup"
                    ? "bg-[#4B2E2E] text-white shadow-lg scale-[1.02]"
                    : "text-[#4B2E2E] hover:bg-[#FDF4F6]"
                }`}
              >
                🏪 Pickup
              </button>
            </div>

            {/* Shared Fields — Compact Grid */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border-2 border-[#4B2E2E]/5 p-2 rounded-xl w-full text-xs text-[#4B2E2E] focus:outline-none focus:border-[#4B2E2E] placeholder:text-[#4B2E2E]/20 font-medium"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border-2 border-[#4B2E2E]/5 p-2 rounded-xl w-full text-xs text-[#4B2E2E] focus:outline-none focus:border-[#4B2E2E] placeholder:text-[#4B2E2E]/20 font-medium"
              />
            </div>

            {/* Delivery: address field */}
            {mode === "delivery" && (
              <input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white border-2 border-[#4B2E2E]/5 p-2 rounded-xl w-full text-xs text-[#4B2E2E] focus:outline-none focus:border-[#4B2E2E] placeholder:text-[#4B2E2E]/20 font-medium"
              />
            )}

            {/* Pickup: store selector */}
            {mode === "pickup" && (
              <div className="grid grid-cols-2 gap-2">
                {STORES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStore(s.id)}
                    className={`text-center px-1 py-1.5 rounded-lg border-2 font-black text-[9px] leading-tight uppercase transition-all duration-300 ${
                      store === s.id
                        ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-md scale-[1.02]"
                        : "bg-white text-[#4B2E2E] border-[#4B2E2E]/10 hover:bg-[#FDF4F6]"
                    }`}
                  >
                    {s.label.split(" ").pop() === "Senegambia" || s.label.split(" ").pop() === "German" 
                      ? s.label.split(" ").slice(-2).join(" ") 
                      : s.label.replace("Bubbles ", "")}
                  </button>
                ))}
              </div>
            )}

            {/* Total and Place Order — Side by Side for extreme compactness */}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#4B2E2E]/40 uppercase tracking-widest">Total</span>
                <span className="font-black text-xl text-[#4B2E2E] leading-none">D{totalPrice.toFixed(0)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className={`flex-1 bg-[#25D366] text-white py-3 rounded-full font-bold text-sm hover:bg-[#1ebe57] transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isShaking ? "animate-shake" : ""
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
