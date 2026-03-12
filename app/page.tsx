"use client";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Mens from "../components/mens";
import AboutSection from "../components/AboutSection";
import Testimonials from "../components/testimonials";
import Footer from "../components/Footer";
// import DeliveryHero from "@/components/DeliveryHero";
// import DeliveryPickup from "../components/DeliveryHero";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Mens />
      <AboutSection />
      {/* <DeliveryHero /> */}
      <Testimonials />
      <Footer />
    </main>
  );
}
