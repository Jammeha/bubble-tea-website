"use client";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Mens from "../components/mens";
import AboutSection from "../components/AboutSection";
import Rewards from "../components/Rewards";
import Testimonials from "../components/testimonials";
// import DeliveryHero from "@/components/DeliveryHero";
// import DeliveryPickup from "../components/DeliveryHero";
import { drinks } from "../components/drink/drinks";
// import DrinkCard from "../components/DrinkCard";
// import Cart from "../components/Cart";
import CheckoutForm from "../components/CheckoutForm";
import Footer from "../components/Footer";

export default function Home() {
  const [cart, setCart] = useState<any>([]);

  // Add a drink to the cart
  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  // Remove drink from cart
  const removeFromCart = (index: any) => {
    setCart(cart.filter((_: any, i: any) => i !== index));
  };

  return (
    <main>
      <Navbar />
      <Hero />
      <Mens />
      <AboutSection />
      <Rewards />
      {/* <DeliveryHero /> */}
      <Testimonials />
      <Footer />

      {/* <DeliveryPickup /> */}

      {/* Drinks Section */}
      {/* <div className="px-6 lg:px-20 py-10 grid lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drinks.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} addToCart={addToCart} />
          ))}
        </div> */}

      {/* <div className="flex flex-col gap-4">
        <Cart cart={cart} removeFromCart={removeFromCart} />
        {cart.length > 0 && <CheckoutForm cart={cart} />}
      </div> */}
      {/* </div> */}
      {/* <Footer /> */}
    </main>
  );
}
