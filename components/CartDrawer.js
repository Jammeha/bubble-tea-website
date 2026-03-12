"use client";

import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import Image from "next/image";

const STORE_WHATSAPP = "220XXXXXXXX"; // ← Replace with the real WhatsApp number

const STORES = [
  { id: "senegambia", label: "Tropic Mall Senegambia" },
  { id: "latrikunda", label: "Latrikunda German" },
];

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

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handlePlaceOrder = () => {
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
        return `• ${item.name} (${item.size}, ${item.sweetness} sweet, ${item.ice}${toppingText}) x${item.qty} — $${(item.price * item.qty).toFixed(2)}`;
      })
      .join("\n");

    const fulfillment =
      mode === "delivery"
        ? `🛵 *Delivery*\nAddress: ${address}`
        : `🏪 *Pickup*\nStore: ${STORES.find((s) => s.id === store)?.label}`;

    const message =
      `🧋 *New Order from Bubbles!*\n\n` +
      `*Order:*\n${itemLines}\n\n` +
      `*Total: $${totalPrice.toFixed(2)}*\n\n` +
      `${fulfillment}\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}`;

    const url = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
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
        <div className="bg-[#F7D9DC] px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#4B2E2E]">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-[#4B2E2E] hover:scale-110 transition text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[#4B2E2E]">
              <span className="text-5xl">🧋</span>
              <p className="text-lg font-semibold">Your cart is empty!</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 bg-[#4B2E2E] text-white px-6 py-2 rounded-full hover:bg-[#5C3B3B] transition"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-3 border-b pb-4">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-[#4B2E2E]">
                        {item.name}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[#E88997] font-semibold">
                      ${(item.price || 0).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-7 h-7 border border-[#4B2E2E] rounded-full text-[#4B2E2E] hover:bg-[#4B2E2E] hover:text-white transition"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.qty || 1}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-7 h-7 border border-[#4B2E2E] rounded-full text-[#4B2E2E] hover:bg-[#4B2E2E] hover:text-white transition"
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
          <div className="border-t px-6 py-4 bg-[#FDF4F6] flex flex-col gap-3">

            {/* Delivery / Pickup Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-pink-200">
              <button
                onClick={() => setMode("delivery")}
                className={`flex-1 py-2.5 font-semibold text-sm flex items-center justify-center gap-1.5 transition ${
                  mode === "delivery"
                    ? "bg-[#4B2E2E] text-white"
                    : "bg-white text-[#4B2E2E] hover:bg-pink-50"
                }`}
              >
                🛵 Delivery
              </button>
              <button
                onClick={() => setMode("pickup")}
                className={`flex-1 py-2.5 font-semibold text-sm flex items-center justify-center gap-1.5 transition ${
                  mode === "pickup"
                    ? "bg-[#4B2E2E] text-white"
                    : "bg-white text-[#4B2E2E] hover:bg-pink-50"
                }`}
              >
                🏪 Pickup
              </button>
            </div>

            {/* Shared Fields */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-pink-200 p-2 rounded-lg w-full focus:outline-none focus:border-[#4B2E2E]"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-pink-200 p-2 rounded-lg w-full focus:outline-none focus:border-[#4B2E2E]"
            />

            {/* Delivery: address field */}
            {mode === "delivery" && (
              <input
                type="text"
                placeholder="Delivery Address (street, area...)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-pink-200 p-2 rounded-lg w-full focus:outline-none focus:border-[#4B2E2E]"
              />
            )}

            {/* Pickup: store selector */}
            {mode === "pickup" && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-[#4B2E2E] uppercase tracking-wide">
                  Pick Up From
                </p>
                {STORES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStore(s.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition ${
                      store === s.id
                        ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow"
                        : "bg-white text-[#4B2E2E] border-pink-200 hover:border-[#4B2E2E]"
                    }`}
                  >
                    📍 {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center mt-1">
              <span className="font-bold text-lg text-[#4B2E2E]">
                Total: ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Place Order — sends via WhatsApp */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#25D366] text-white py-3 rounded-full font-semibold hover:bg-[#1ebe57] transition flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Place Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
