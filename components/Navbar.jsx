"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <nav className="bg-[#F7D9DC] px-6 md:px-10 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" width={45} height={45} alt="bubbles logo" />
          <span className="font-bold text-[#4B2E2E] text-lg">Bubbles</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[#4B2E2E] font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:text-[#E88997] transition"
              suppressHydrationWarning
            >
              Delivery
            </button>
          </li>
          <li>
            <Link href="/#contact" className="hover:text-[#E88997] transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Cart Icon → opens drawer */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:scale-110 transition"
            suppressHydrationWarning
          >
            <Image src="/cup.png" width={35} height={35} alt="cart cup" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          {/* Login Button */}
          <button 
            className="hidden md:inline bg-[#4B2E2E] text-white px-6 py-2 rounded-full hover:bg-[#5C3B3B]"
            suppressHydrationWarning
          >
            Login
          </button>

          {/* Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} suppressHydrationWarning>
              <svg
                className="w-8 h-8 text-[#4B2E2E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F7D9DC] p-6 shadow-xl flex flex-col gap-4 text-[#4B2E2E] font-semibold border-t border-pink-200">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/menu" onClick={() => setIsOpen(false)}>
            Menu
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsOpen(false);
            }}
            className="text-left"
            suppressHydrationWarning
          >
            Delivery
          </button>
          <Link href="/#contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
