"use client";
import { useState } from "react";

export default function CheckoutForm({ cart }) {
  const [location, setLocation] = useState("senegambia");
  const [street, setStreet] = useState("");

  const handleWhatsAppCheckout = () => {
    if (!street) return alert("Please enter your street/house number");

    const cartMessage = cart
      .map(
        (item) => `${item.name} (${item.size}, ${item.ice}) x${item.quantity}`,
      )
      .join("\n");
    const address = `Delivery Location: ${location}, ${street}`;
    const message = `${cartMessage}\n\n${address}`;
    const whatsappLink = `https://wa.me/220XXXXXXXX?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="bg-brandPink border border-brandBrown p-4 rounded shadow-md mt-4 max-w-sm">
      <h2 className="text-xl font-bold text-brandBrown mb-2">Delivery Info</h2>

      <div className="mb-2">
        <label className="text-brandBrown">Location: </label>
        <select
          className="border p-1 rounded ml-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="senegambia">Senegambia</option>
          <option value="latrikunda">Latrikunda German</option>
        </select>
      </div>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Street/House Number"
          className="border p-2 rounded w-full"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      <button
        className="bg-brandBrown text-brandPink px-4 py-2 rounded hover:bg-[#5c3d2e]"
        onClick={handleWhatsAppCheckout}
      >
        Checkout via WhatsApp
      </button>
    </div>
  );
}
