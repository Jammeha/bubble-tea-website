"use client";

import Image from "next/image";

interface ReceiptProps {
  order: any;
  onClose: () => void;
}

export default function Receipt({ order, onClose }: ReceiptProps) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-start justify-center overflow-y-auto pt-10 pb-10 print:p-0 print:bg-white">
      <div className="bg-white w-[350px] p-8 shadow-2xl relative print:shadow-none print:w-full print:p-4">
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 print:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Receipt Header */}
        <div className="text-center border-b-2 border-dashed border-gray-200 pb-6 mb-6">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" width={60} height={60} alt="Bubbles Logo" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-[#4B2E2E]">Bubbles</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Premium Bubble Tea & Waffles</p>
          <p className="text-[10px] text-gray-400 mt-2">{new Date().toLocaleString()}</p>
        </div>

        {/* Order Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400 tracking-widest">
            <span>Item</span>
            <span>Price</span>
          </div>
          {order.items?.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between text-xs text-[#4B2E2E]">
              <div className="pr-4">
                <p className="font-black uppercase">{item.name} x{item.qty}</p>
                <p className="text-[9px] text-gray-500">
                  {item.size}
                  {item.sweetness !== "N/A" && ` | ${item.sweetness} Sweet`}
                  {item.ice !== "N/A" && ` | ${item.ice} Ice`}
                </p>
                {item.toppings?.length > 0 && (
                  <p className="text-[9px] text-gray-400 italic">+{item.toppings.map((t: any) => t.name).join(", ")}</p>
                )}
              </div>
              <span className="font-bold whitespace-nowrap">D{(item.price * item.qty).toFixed(0)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-xs text-gray-500 uppercase font-black">
            <span>Subtotal</span>
            <span>D{(order.totalPrice || 0).toFixed(0)}</span>
          </div>
          {order.deliveryFee > 0 && (
            <div className="flex justify-between text-xs text-gray-500 uppercase font-black">
              <span>Delivery Fee</span>
              <span>D{order.deliveryFee.toFixed(0)}</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-black text-[#4B2E2E] border-t border-gray-100 pt-2">
            <span>Total</span>
            <span>D{(order.finalTotal || 0).toFixed(0)}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mt-6 text-[10px] text-gray-500 text-center bg-gray-50 p-3 rounded-xl">
          <p className="font-bold uppercase tracking-widest mb-1 text-gray-400">Customer</p>
          <p className="font-black text-[#4B2E2E]">{order.customerName}</p>
          <p>{order.customerPhone}</p>
          {order.deliveryZone && <p className="mt-1 font-bold text-[#4B2E2E]">Area: {order.deliveryZone}</p>}
          {order.deliveryAddress && <p className="mt-1 italic">{order.deliveryAddress}</p>}
        </div>

        {/* Print Button (Hidden on Print) */}
        <div className="mt-8 flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 bg-[#4B2E2E] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
          >
            🖨️ Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
