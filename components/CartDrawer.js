"use client";

import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import Image from "next/image";

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

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Order placed successfully!");
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

        {/* Content */}
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

        {/* Footer - Delivery Form + Checkout */}
        {cart.length > 0 && (
          <div className="border-t px-6 py-4 bg-[#FDF4F6] flex flex-col gap-3">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-pink-200 p-2 rounded-lg w-full focus:outline-none focus:border-[#4B2E2E]"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-pink-200 p-2 rounded-lg w-full focus:outline-none focus:border-[#4B2E2E]"
            />
            <input
              type="text"
              placeholder="Delivery Address"
              className="border border-pink-200 p-2 rounded-lg w-full focus:outline-none focus:border-[#4B2E2E]"
            />
            <div className="flex justify-between items-center mt-1">
              <span className="font-bold text-lg text-[#4B2E2E]">
                Total: ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#4B2E2E] text-white py-3 rounded-full font-semibold hover:bg-[#5C3B3B] transition"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
