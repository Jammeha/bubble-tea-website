"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#F7D9DC] px-6 md:px-10 py-4 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" width={45} height={45} alt="bubbles logo" />
          <span className="font-bold text-[#4B2E2E] text-lg">Bubbles</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-[#4B2E2E] font-bold tracking-wide">
          <li>
            <Link href="/" className="hover:text-[#E88997] transition px-2 py-1">Home</Link>
          </li>
          <li>
            <Link href="/menu" className="hover:text-[#E88997] transition px-2 py-1">Menu</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-[#E88997] transition px-2 py-1">About</Link>
          </li>
          <li>
            <Link href="/#contact" className="hover:text-[#E88997] transition px-2 py-1">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} suppressHydrationWarning aria-label="Toggle menu">
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
          <Link href="/#contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
