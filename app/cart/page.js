"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();

  return (
    <>
      <Navbar />

      <section className="min-h-screen px-6 py-20 bg-[#FDF4F6]">
        <h1 className="text-5xl font-bold text-[#4B2E2E] mb-10 text-center">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            Your cart is empty
          </p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-6 rounded-xl shadow"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    width={70}
                    height={70}
                    alt={item.name}
                    className="object-contain"
                  />

                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-pink-500">D{item.price}</p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="text-right mt-10">
              <h2 className="text-3xl font-bold text-[#4B2E2E]">
                Total: D{totalPrice}
              </h2>

              <button className="mt-6 bg-[#4B2E2E] text-white px-8 py-3 rounded-full hover:bg-[#5C3B3B]">
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
