"use client";

import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";

const CONTACT_NUMBER = "220XXXXXXXX"; // Replace with real number

const ContactSection = () => {
  return (
    <section id="contact" className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#E88997] uppercase tracking-widest font-semibold mb-2">
            Visit Us
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#4B2E2E]">
            Get In Touch
          </h1>
          <p className="mt-4 text-[#6B4B4B] text-lg max-w-2xl mx-auto">
            Have a question or want to place a large order? Reach out to us or visit one of our cozy spots.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Senegambia */}
          <div className="bg-[#FDF4F6] p-8 rounded-3xl shadow-sm border border-pink-100 hover:shadow-md transition">
            <div className="bg-[#E88997] w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white">
              <MapPin size={24} />
            </div>
            <h3 className="text-2xl font-bold text-[#4B2E2E] mb-2">Senegambia</h3>
            <p className="text-[#6B4B4B] mb-6">
              Tropic Mall Senegambia,<br />
              Senegambia Strip, The Gambia
            </p>
            <div className="pt-6 border-t border-pink-200">
              <h4 className="font-bold text-[#4B2E2E] flex items-center gap-2 mb-3">
                <Clock size={16} /> Opening Hours
              </h4>
              <ul className="text-sm text-[#6B4B4B] space-y-1">
                <li className="flex justify-between"><span>Mon - Thu</span> <span>10:00 - 22:00</span></li>
                <li className="flex justify-between"><span>Fri - Sun</span> <span>10:00 - 23:00</span></li>
              </ul>
            </div>
          </div>

          {/* Card 2: Latrikunda */}
          <div className="bg-[#FDF4F6] p-8 rounded-3xl shadow-sm border border-pink-100 hover:shadow-md transition">
            <div className="bg-[#E88997] w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white">
              <MapPin size={24} />
            </div>
            <h3 className="text-2xl font-bold text-[#4B2E2E] mb-2">Latrikunda</h3>
            <p className="text-[#6B4B4B] mb-6">
              Latri Kunda German,<br />
              West Coast Region, The Gambia
            </p>
            <div className="pt-6 border-t border-pink-200">
              <h4 className="font-bold text-[#4B2E2E] flex items-center gap-2 mb-3">
                <Clock size={16} /> Opening Hours
              </h4>
              <ul className="text-sm text-[#6B4B4B] space-y-1">
                <li className="flex justify-between"><span>Mon - Thu</span> <span>09:00 - 21:00</span></li>
                <li className="flex justify-between"><span>Fri - Sun</span> <span>09:00 - 22:00</span></li>
              </ul>
            </div>
          </div>

          {/* Card 3: Contact Info */}
          <div className="bg-[#4B2E2E] p-8 rounded-3xl shadow-xl lg:col-span-1 md:col-span-2 flex flex-col justify-center text-white">
            <h3 className="text-3xl font-bold mb-4">Chat with us!</h3>
            <p className="text-pink-100/80 mb-8 max-w-sm">
              Quick questions about flavors or delivery areas? Message us on WhatsApp for the fastest response.
            </p>
            
            <div className="flex flex-col gap-4">
              <a 
                href={`https://wa.me/${CONTACT_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition shadow-lg"
              >
                <MessageCircle size={20} /> WhatsApp Us
              </a>
              <a 
                href={`tel:${CONTACT_NUMBER}`}
                className="bg-white/10 text-white py-4 rounded-2xl font-bold border border-white/20 flex items-center justify-center gap-2 hover:bg-white/20 transition"
              >
                <Phone size={20} /> Call Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
