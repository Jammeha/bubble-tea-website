"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/context/CartContext";
import { STORES } from "@/constants/locations";
import { generalSettings } from "@/app/data/general";
import Image from "next/image";
import Link from "next/link";
import Receipt from "@/components/Receipt";

const DEFAULT_DELIVERY_FEE = 300;
const CONTACT_NUMBER = "2205410593";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { cart, totalPrice, setIsCartOpen } = useCart() as any;
  const deliveryFee = DEFAULT_DELIVERY_FEE;
  const freeThreshold = generalSettings.freeDeliveryThreshold;
  const stores = STORES;

  // Form state
  const [mode, setMode] = useState("delivery"); // "delivery" | "pickup"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [store, setStore] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash"); // "cash" | "waychit"
  const [hasPaid, setHasPaid] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (stores.length > 0) setStore(stores[0].id);
    // Close the cart drawer when arriving at checkout
    setIsCartOpen(false);
  }, [stores, setIsCartOpen]);

  if (!mounted) return null;

  const handlePlaceOrder = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    if (!name.trim()) return alert("Please enter your full name.");
    if (!phone.trim()) return alert("Please enter your phone number.");
    if (mode === "delivery" && !address.trim())
      return alert("Please enter your delivery address.");

    const itemLines = cart
      .map((item: any) => {
        const toppingText =
          item.toppings && item.toppings.length > 0
            ? ` + ${item.toppings.map((t: any) => t.name).join(", ")}`
            : "";
        return `• ${item.name} (${item.size}, ${item.sweetness} sweet, ${item.ice}${toppingText}) x${item.qty} — D${(item.price * item.qty).toFixed(2)}`;
      })
      .join("\n");

    const fulfillment =
      mode === "delivery"
        ? `🛵 *Delivery*\nAddress: ${address}`
        : `🏪 *Pickup*\nStore: ${stores.find((s: any) => s.id === store)?.label}`;

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
      store: mode === "pickup" ? stores.find((s: any) => s.id === store)?.label : null
    });

    const url = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    
    // Switch to receipt view
    setShowReceipt(true);
  };

  const currentTotal = totalPrice + (mode === "delivery" && totalPrice < freeThreshold ? deliveryFee : 0);

  if (cart.length === 0 && !showReceipt) {
    return (
      <div className="min-h-screen bg-[#FDF4F6] flex flex-col items-center justify-center p-6 text-center">
        <span className="text-8xl mb-6">🧋</span>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-[#4B2E2E] mb-4">Your cart is empty!</h1>
        <Link href="/menu" className="bg-[#4B2E2E] text-white px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest shadow-xl hover:bg-[#E88997] transition-all">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF4F6] pb-20 pt-10 px-4 md:px-0">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Column: Fulfillment & Payment */}
        <div className="bg-white rounded-[40px] p-8 shadow-xl border-2 border-[#4B2E2E]/5 animate-fadeIn">
          <Link href="/menu" className="inline-flex items-center gap-2 text-[#4B2E2E]/40 hover:text-[#4B2E2E] mb-8 transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
             <span className="font-black uppercase text-xs tracking-widest">Back to Menu</span>
          </Link>

          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#4B2E2E] mb-8">Checkout</h1>

          <div className="space-y-8">
            {/* Fulfillment Toggle */}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4B2E2E]/30 pl-1">How would you like your order?</p>
              <div className="flex bg-[#FDF4F6] p-1.5 rounded-2xl border-2 border-[#4B2E2E]/5">
                <button
                  onClick={() => setMode("delivery")}
                  className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-500 ${
                    mode === "delivery" ? "bg-white text-[#4B2E2E] shadow-xl scale-[1.02]" : "text-[#4B2E2E]/40 hover:text-[#4B2E2E]"
                  }`}
                >
                  🛵 Delivery
                </button>
                <button
                  onClick={() => setMode("pickup")}
                  className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-500 ${
                    mode === "pickup" ? "bg-white text-[#4B2E2E] shadow-xl scale-[1.02]" : "text-[#4B2E2E]/40 hover:text-[#4B2E2E]"
                  }`}
                >
                  🏪 Pickup
                </button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4B2E2E]/30 pl-1">Your Information</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#FDF4F6] border-2 border-transparent focus:border-[#4B2E2E] p-4 rounded-2xl w-full text-sm text-[#4B2E2E] focus:outline-none placeholder:text-[#4B2E2E]/20 font-bold transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#FDF4F6] border-2 border-transparent focus:border-[#4B2E2E] p-4 rounded-2xl w-full text-sm text-[#4B2E2E] focus:outline-none placeholder:text-[#4B2E2E]/20 font-bold transition-all"
                  />
               </div>
               {mode === "delivery" && (
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-[#FDF4F6] border-2 border-transparent focus:border-[#4B2E2E] p-4 rounded-2xl w-full text-sm text-[#4B2E2E] focus:outline-none placeholder:text-[#4B2E2E]/20 font-bold transition-all animate-fadeIn"
                  />
               )}
               {mode === "pickup" && (
                  <div className="grid grid-cols-2 gap-3 animate-fadeIn">
                     {stores.map((s: any) => (
                        <button
                          key={s.id}
                          onClick={() => setStore(s.id)}
                          className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-wider transition-all duration-300 ${
                            store === s.id ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-lg scale-[1.02]" : "bg-white text-[#4B2E2E] border-[#4B2E2E]/10 hover:border-[#4B2E2E]/20"
                          }`}
                        >
                          {s.label}
                        </button>
                     ))}
                  </div>
               )}
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-4 border-t border-[#4B2E2E]/5">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4B2E2E]/30 pl-1">Payment Method</p>
               <div className="flex gap-4">
                  <button
                    onClick={() => { setPaymentMethod("cash"); setHasPaid(false); }}
                    className={`flex-1 py-5 rounded-3xl border-2 font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
                      paymentMethod === "cash" ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-2xl scale-[1.05]" : "bg-white text-[#4B2E2E] border-[#4B2E2E]/10"
                    }`}
                  >
                    💵 Cash
                  </button>
                  <button
                    onClick={() => setPaymentMethod("waychit")}
                    className={`flex-1 py-5 rounded-3xl border-2 font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
                      paymentMethod === "waychit" ? "bg-[#4B2E2E] text-white border-[#4B2E2E] shadow-2xl scale-[1.05]" : "bg-white text-[#4B2E2E] border-[#4B2E2E]/10"
                    }`}
                  >
                    🌊 Waychit
                  </button>
               </div>

               {/* Waychit Instructions */}
               {paymentMethod === "waychit" && !hasPaid && (
                  <div className="bg-[#4B2E2E] text-white p-6 rounded-3xl space-y-6 animate-slideUp shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
                    <div className="text-center space-y-1 relative">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Send Wave to:</p>
                       <div className="flex items-center justify-center gap-3">
                         <p className="text-3xl font-black text-[#F7D9DC] tracking-tighter">{generalSettings.waveNumber}</p>
                         <button 
                           onClick={() => { navigator.clipboard.writeText(generalSettings.waveNumber); alert("Number copied!"); }}
                           className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all border border-white/10"
                         >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                           </svg>
                         </button>
                       </div>
                       <div className="mt-4 inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                          <p className="text-sm font-black text-white italic tracking-tighter">D{currentTotal.toFixed(0)}</p>
                          <button onClick={() => { navigator.clipboard.writeText(currentTotal.toFixed(0)); alert("Amount copied!"); }} className="text-white/30 hover:text-white">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          </button>
                       </div>
                    </div>
                    <button
                      onClick={() => setHasPaid(true)}
                      className="w-full bg-[#E88997] text-[#4B2E2E] py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-[1.02] transition-all shadow-xl border-b-4 border-[#4B2E2E]/20"
                    >
                      I have sent the payment
                    </button>
                  </div>
               )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:sticky lg:top-10 space-y-6 h-fit">
           <div className="bg-white rounded-[40px] p-8 shadow-xl border-2 border-[#4B2E2E]/5 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-black uppercase tracking-tighter text-[#4B2E2E] mb-6">Order Summary</h2>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                 {cart.map((item: any) => (
                    <div key={item.id} className="flex gap-4 border-b border-[#4B2E2E]/5 pb-6 last:border-0 last:pb-0">
                       <div className="w-16 h-16 relative bg-[#FDF4F6] rounded-2xl overflow-hidden flex-shrink-0">
                          {item.image ? (
                             <Image src={item.image} alt={item.name} fill className="object-contain" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-3xl">🧋</div>
                          )}
                       </div>
                       <div className="flex-1">
                          <p className="font-black uppercase text-xs text-[#4B2E2E]">{item.name} x{item.qty}</p>
                          <p className="text-[10px] text-[#4B2E2E]/40 font-bold uppercase tracking-widest mt-0.5">{item.size} | {item.sweetness} Sweet</p>
                          <p className="text-sm font-black text-[#4B2E2E] mt-1">D{(item.price * item.qty).toFixed(0)}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-8 pt-8 border-t-2 border-dashed border-[#4B2E2E]/10 space-y-4">
                 <div className="flex justify-between items-center text-sm font-black uppercase text-[#4B2E2E]/40 tracking-widest">
                    <span>Subtotal</span>
                    <span>D{totalPrice.toFixed(0)}</span>
                 </div>
                 {mode === "delivery" && (
                    <div className="flex justify-between items-center text-sm font-black uppercase text-[#4B2E2E]/40 tracking-widest animate-fadeIn">
                       <span>Delivery Fee</span>
                       <span>{totalPrice >= freeThreshold ? "FREE" : `D${deliveryFee}`}</span>
                    </div>
                 )}
                 <div className="flex justify-between items-center pt-4 border-t border-[#4B2E2E]/5">
                    <span className="text-lg font-black uppercase tracking-tighter text-[#4B2E2E]">Total</span>
                    <span className="text-3xl font-black text-[#4B2E2E]">D{currentTotal.toFixed(0)}</span>
                 </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={paymentMethod === "waychit" && !hasPaid}
                className={`w-full mt-8 bg-[#25D366] text-white py-5 rounded-[25px] font-black text-sm uppercase tracking-widest hover:bg-[#1ebe57] transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed ${isShaking ? "animate-shake" : ""}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Place Order via WhatsApp
              </button>
           </div>
        </div>

      </div>

      {showReceipt && (
        <Receipt 
          order={lastOrder} 
          onClose={() => setShowReceipt(false)} 
        />
      )}
    </main>
  );
}
