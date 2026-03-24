"use client";

import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import { STORES } from "@/constants/locations";
import { generalSettings } from "@/app/data/general";
import Image from "next/image";
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

  // Form state
  const [mode, setMode] = useState("delivery"); // "delivery" | "pickup"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [store, setStore] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash"); // "cash" | "waychit"
  const [hasPaid, setHasPaid] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (stores.length > 0) setStore(stores[0].id);
  }, [stores]);

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
        : `🏪 *Pickup*\nStore: ${stores.find((s) => s.id === store)?.label}`;

    const isFreeDelivery = totalPrice >= freeThreshold;
    const currentDeliveryFee = mode === "delivery" && !isFreeDelivery ? deliveryFee : 0;
    const finalTotal = totalPrice + currentDeliveryFee;

    const message =
      `🥤 *BUBBLES — NEW ORDER* 🥤\n` +
      `--------------------------\n` +
      `*🛒 ORDER:*\n${itemLines}\n` +
      `--------------------------\n` +
      (currentDeliveryFee > 0 ? `*🛵 DELIVERY FEE:* D${currentDeliveryFee}\n` : (mode === "delivery" ? `*🛵 DELIVERY FEE:* FREE\n` : "")) +
      `*💰 TOTAL:* D${finalTotal.toFixed(0)}\n` +
      `--------------------------\n` +
      `${fulfillment}\n\n` +
      `*💳 PAYMENT:* ${paymentMethod === "cash" ? "💵 CASH" : "🌊 WAYCHIT/WAVE"}\n` +
      `\n*👤 CUSTOMER:*\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}`;

    // Set order details for receipt
    setLastOrder({
      items: cart,
      totalPrice,
      deliveryFee: currentDeliveryFee,
      finalTotal,
      paymentMethod,
      fulfillment: mode,
      customerName: name,
      customerPhone: phone,
      deliveryAddress: mode === "delivery" ? address : null,
      store: mode === "pickup" ? stores.find((s) => s.id === store)?.label : null
    });

    const url = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    
    // Switch to receipt view
    setShowReceipt(true);
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

            {/* Step 1: Customer Details */}
            <div className="grid grid-cols-2 gap-2 animate-fadeIn">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!e.target.value.trim()) setShowPaymentSection(false);
                }}
                className="bg-white border-2 border-[#4B2E2E]/5 p-2 rounded-xl w-full text-xs text-[#4B2E2E] focus:outline-none focus:border-[#4B2E2E] placeholder:text-[#4B2E2E]/20 font-medium"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (!e.target.value.trim()) setShowPaymentSection(false);
                }}
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
                className="bg-white border-2 border-[#4B2E2E]/5 p-2 rounded-xl w-full text-xs text-[#4B2E2E] focus:outline-none focus:border-[#4B2E2E] placeholder:text-[#4B2E2E]/20 font-medium animate-fadeIn"
              />
            )}

            {!showPaymentSection ? (
              <button
                onClick={() => {
                  if (!name.trim() || !phone.trim() || (mode === "delivery" && !address.trim())) {
                    return alert("Please fill in your details first.");
                  }
                  setShowPaymentSection(true);
                }}
                className="bg-[#4B2E2E] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
              >
                Proceed to Payment
              </button>
            ) : (
              <div className="flex flex-col gap-3 animate-slideUp">
                {/* Payment Method Selector */}
                <div className="flex gap-2 p-1 bg-white rounded-xl border-2 border-[#4B2E2E]/10">
                  <button
                    onClick={() => {
                      setPaymentMethod("cash");
                      setHasPaid(false);
                    }}
                    className={`flex-1 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all duration-300 ${
                      paymentMethod === "cash"
                        ? "bg-[#4B2E2E] text-white shadow-md"
                        : "text-[#4B2E2E] hover:bg-[#FDF4F6]"
                    }`}
                  >
                    💵 Cash
                  </button>
                  <button
                    onClick={() => setPaymentMethod("waychit")}
                    className={`flex-1 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all duration-300 ${
                      paymentMethod === "waychit"
                        ? "bg-[#4B2E2E] text-white shadow-md"
                        : "text-[#4B2E2E] hover:bg-[#FDF4F6]"
                    }`}
                  >
                    🌊 Waychit
                  </button>
                </div>

                {/* Waychit Instructions */}
                {paymentMethod === "waychit" && !hasPaid && (
                  <div className="bg-[#4B2E2E] text-white p-5 rounded-2xl flex flex-col gap-4 shadow-xl border-2 border-white/10 animate-fadeIn">
                    <div className="text-center space-y-1">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Send Wave to:</p>
                       <div className="flex items-center justify-center gap-2">
                         <p className="text-xl font-black text-[#F7D9DC] tracking-wider">{generalSettings.waveNumber}</p>
                         <button 
                           onClick={() => {
                             navigator.clipboard.writeText(generalSettings.waveNumber);
                             alert("Wave number copied!");
                           }}
                           className="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors border border-white/10"
                           title="Copy Number"
                         >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                           </svg>
                         </button>
                       </div>
                       
                       <div className="pt-2 flex flex-col items-center">
                         <p className="text-[9px] text-white/40 uppercase font-black tracking-widest leading-none">Total Amount</p>
                         <div className="flex items-center gap-2">
                           <p className="text-base text-white font-black italic">D{(totalPrice + (mode === "delivery" && totalPrice < freeThreshold ? deliveryFee : 0)).toFixed(0)}</p>
                           <button 
                             onClick={() => {
                               navigator.clipboard.writeText((totalPrice + (mode === "delivery" && totalPrice < freeThreshold ? deliveryFee : 0)).toFixed(0));
                               alert("Amount copied!");
                             }}
                             className="text-white/40 hover:text-white transition-colors"
                           >
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                             </svg>
                           </button>
                         </div>
                       </div>
                    </div>
                    
                    <button
                      onClick={() => setHasPaid(true)}
                      className="w-full bg-[#E88997] text-[#4B2E2E] py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-[1.02] transition-all shadow-lg border-b-4 border-[#4B2E2E]/20"
                    >
                      I have sent the payment
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pickup: store selector */}
            {mode === "pickup" && stores.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {stores.map((s) => (
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
            {mode === "delivery" && (
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-[10px] font-bold text-[#4B2E2E]/60 uppercase tracking-widest">Delivery Fee</span>
                <span className="font-black text-sm text-[#4B2E2E]">
                  {totalPrice >= freeThreshold ? "FREE" : `D${deliveryFee}`}
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#4B2E2E]/40 uppercase tracking-widest">Total</span>
                <span className="font-black text-xl text-[#4B2E2E] leading-none">
                  D{(totalPrice + (mode === "delivery" && totalPrice < freeThreshold ? deliveryFee : 0)).toFixed(0)}
                </span>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={!showPaymentSection || (paymentMethod === "waychit" && !hasPaid)}
                className={`flex-1 bg-[#25D366] text-white py-3 rounded-full font-bold text-sm hover:bg-[#1ebe57] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed ${
                  isShaking ? "animate-shake" : ""
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
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
