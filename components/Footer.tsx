"use client";
import { Instagram, Facebook, Music2, Share2, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { STORES } from "../constants/locations";

const Footer = () => {
  const footerData = {
    sections: [
      {
        title: "Visit Us",
        items: STORES.map(store => ({
          name: store.label,
          sub: store.address,
          icon: <MapPin size={14} className="text-[#E88997]" />,
        })),
      },
      {
        title: "Quick Explore",
        items: [
          { name: "Our Drinks", href: "/menu" },
          { name: "Special Offers", href: "/menu?category=specials" },
          { name: "Bubbles Story", href: "/about" },
          { name: "Contact", href: "#" },
        ],
      },
    ],
  };

  return (
    <footer className="relative bg-[#4B2E2E] text-white pt-36 pb-12 px-6 md:px-16 overflow-hidden">
      {/* Premium Multi-Layered Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg className="relative block w-[calc(116%+1.3px)] h-[90px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V0H1200V120C1128.89,113.09,1055.71,111.31,985.66,92.83Z" fill="#FFFFFF" className="opacity-100"></path>
          <path d="M0,0V120c70.05,18.48,146.53,26.09,214.34,3,58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0Z" fill="#4B2E2E" opacity="0.1"></path>
        </svg>
      </div>

      {/* Floating Branded Corner Decoration - Bottom Right */}
      <div className="absolute bottom-[-20px] right-[-20px] w-40 h-40 bg-[#E88997] opacity-10 rounded-full blur-[60px]"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-5 pointer-events-none select-none grayscale invert">
         <Image src="/logo.png" alt="Bubbles Seal" width={100} height={100} />
      </div>

      {/* Branded Gloe - Bottom Left */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#F7D9DC] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      
      {/* Floating Decorative Bobas - Strategic Corners */}
      <div className="absolute top-40 right-[15%] w-12 h-12 bg-[#E88997]/20 rounded-full blur-sm"></div>
      <div className="absolute bottom-60 left-[10%] w-16 h-16 bg-white/5 rounded-full blur-md"></div>
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <h1 className="text-[25vw] font-black uppercase tracking-[0.3em] leading-none">Bubbles</h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-16 items-start">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-1 space-y-8">
            <Link href="/" className="inline-block">
              <h2 className="text-5xl font-black tracking-tighter text-[#E88997]">
                Bubbles<span className="text-white">.</span>
              </h2>
            </Link>
            
            <p className="text-[#F7D9DC] font-medium leading-relaxed opacity-90 max-w-xs">
              Exceptional tea, chewy pearls, and zero limits. The new era of bubble tea in The Gambia.
            </p>

            <div className="flex gap-5">
              {[
                { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/bubbles_gmb/" },
                { icon: <Facebook size={20} />, label: "Facebook", href: "https://www.facebook.com/bubblesgmb" },
                { icon: <Music2 size={20} />, label: "TikTok", href: "https://www.tiktok.com/@bubbles_gmb_tiktok" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-[#E88997] hover:border-[#E88997] transition-colors shadow-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-[0.4em] text-[#E88997]">
                The Boba Drop
              </h4>
              <p className="text-sm text-white/70 font-medium">
                Vibe with us and get the first look at new flavors.
              </p>
            </div>
            
            <div className="relative max-w-sm">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#E88997] via-[#4B2E2E] to-[#E88997] rounded-[2rem] blur opacity-20"></div>
              <div className="relative flex items-center bg-white rounded-[1.8rem] overflow-hidden shadow-2xl">
                <input
                  type="email"
                  placeholder="vibes@bubbles.gm"
                  className="flex-1 min-w-0 px-6 py-5 bg-transparent outline-none text-sm text-[#4B2E2E] font-medium placeholder:text-[#4B2E2E]/30"
                  suppressHydrationWarning
                />
                <button 
                  className="bg-[#E88997] text-white px-8 py-5 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#4B2E2E] transition-colors whitespace-nowrap"
                  suppressHydrationWarning
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* DYNAMIC COLUMNS (Locations & Links) */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-16">
            {footerData.sections.map((section, index) => (
              <div key={index} className="space-y-8">
                <h4 className="text-sm font-black uppercase tracking-[0.4em] text-[#E88997]">
                  {section.title}
                </h4>
                
                <div className="flex flex-col gap-6">
                  {section.items.map((item, i) => (
                    <div key={i} className="group/item">
                      {(item as any).href ? (
                        <Link
                          href={(item as any).href}
                          className="text-white/60 hover:text-[#E88997] text-sm font-black uppercase tracking-widest hover:pl-3 transition-all flex items-center gap-3"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#E88997] opacity-0 group-hover/item:opacity-100 transition-opacity"></span>
                          {item.name}
                        </Link>
                      ) : (
                        <div className="space-y-2 group/loc">
                          <p className="text-white font-black text-sm uppercase tracking-wider flex items-center gap-3 hover:text-[#E88997] transition-colors">
                             <span className="p-2 bg-white/5 rounded-lg group-hover/loc:bg-[#E88997]/20 transition-colors">{(item as any).icon}</span>
                             {item.name}
                          </p>
                          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest pl-11">{(item as any).sub}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 mb-6 md:mb-0">
             <p suppressHydrationWarning className="hover:text-white transition-colors">© {new Date().getFullYear()} Bubbles International Ltd.</p>
             <div className="flex gap-6">
                <Link href="#" className="hover:text-[#E88997] transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-[#E88997] transition-colors">Terms of Taste</Link>
             </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 shadow-inner">
             <div className="w-1.5 h-1.5 rounded-full bg-[#E88997]"></div>
             <span className="text-[#E88997]">Boba Magic Served 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
