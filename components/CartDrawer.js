"use client";

import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import { STORES } from "@/constants/locations";
import { generalSettings } from "@/app/data/general";
import Image from "next/image";
import Link from "next/link";
import Receipt from "./Receipt";

const DEFAULT_DELIVERY_FEE = 300;
const CONTACT_NUMBER = "2205410593";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const deliveryFee = DEFAULT_DELIVERY_FEE;
  const freeThreshold = generalSettings.freeDeliveryThreshold;
  const stores = STORES;
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useCart();

  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Cart Review */}
            <div className="px-6 py-4 animate-fadeIn">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#4B2E2E]/40">
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
                <>
                  <ul className="space-y-4">
                    {cart.map((item) => (
                      <li key={item.id} className="flex gap-4 border-b border-[#4B2E2E]/5 pb-6">
                        <div className="relative">
                          <div className="w-20 h-20 relative bg-[#FDF4F6] rounded-2xl overflow-hidden border border-[#4B2E2E]/5">
                            {item.image ? (
                               <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-4xl">🧋</div>
                            )}
                          </div>
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
                  
                  {/* Summary */}
                  <div className="mt-8 border-t border-[#4B2E2E]/10 pt-6">
                    <div className="flex justify-between items-center mb-6">
                       <span className="text-sm font-black uppercase text-[#4B2E2E]/40 tracking-widest">Subtotal</span>
                       <span className="text-2xl font-black text-[#4B2E2E]">D{totalPrice.toFixed(0)}</span>
                    </div>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-[#4B2E2E] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#E88997] transition-all shadow-xl flex items-center justify-center gap-2 group"
                    >
                      Check Out
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </>
              )}
            </div>
        </div>

      </div>

      {showReceipt && (
        <Receipt 
          order={lastOrder} 
          onClose={() => setShowReceipt(false)} 
        />
      )}
    </>
  );
}
