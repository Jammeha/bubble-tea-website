"use client";

import { useCart } from "@/components/context/CartContext";
import Navbar from "@/components/Navbar";

export default function CheckoutPage() {
  const { cart, totalPrice, increaseQty, decreaseQty, removeFromCart } =
    useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Order placed successfully!");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cart Items */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Items</h2>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p>${(item.price || 0).toFixed(2)}</p>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="px-2 border rounded"
                        >
                          -
                        </button>
                        <span>{item.qty || 1}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-2 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Delivery Form */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <form className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Delivery Address"
                  className="border p-2 rounded"
                />
                <textarea
                  placeholder="Order Notes"
                  className="border p-2 rounded"
                />
                <div className="mt-4 text-lg font-bold">
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="bg-[#4B2E2E] text-white p-3 rounded mt-3 hover:bg-[#5C3B3B] transition"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
