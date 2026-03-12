import { Instagram, Facebook, Music2 } from "lucide-react";

const Footer = () => {
  const footerData = {
    sections: [
      {
        title: "Locations",
        items: [
          {
            name: "Latri Kunda German",
            sub: "West Coast Region, The Gambia",
          },
          {
            name: "Tropic Mall Senegambia",
            sub: "Senegambia Strip, The Gambia",
          },
        ],
      },
      {
        title: "Quick Links",
        items: [
          { name: "Menu", href: "#" },
          { name: "Order Online", href: "#" },
          { name: "Rewards", href: "#" },
        ],
      },
    ],
  };

  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-b from-[#4b2e2a] to-[#2f1a17] text-white px-8 py-20 overflow-hidden"
    >
      {/* Watermark Logo */}
      <img
        src="/logo.png"
        alt="Boba House Logo"
        className="absolute inset-0 m-auto w-[450px] opacity-[0.04] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-start">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Boba House</h2>

          <p className="text-sm text-white/80">
            Join our email list for updates and special offers.
          </p>

          {/* Premium Email Input */}
          <div className="flex w-full max-w-md border border-white/20 rounded-full overflow-hidden backdrop-blur-md bg-white/5 focus-within:ring-2 focus-within:ring-white/30 transition">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 bg-transparent outline-none text-white placeholder:text-white/50"
            />

            <button className="bg-white text-[#4b2e2a] px-6 font-semibold hover:bg-white/90 transition">
              →
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition duration-300"
            >
              <Instagram size={18} />
            </a>

            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition duration-300"
            >
              <Facebook size={18} />
            </a>

            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition duration-300"
            >
              <Music2 size={18} />
            </a>
          </div>
        </div>

        {/* CENTER SPACE */}
        <div></div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm">
          {footerData.sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-xs uppercase tracking-widest text-white/70 mb-4">
                {section.title}
              </h4>

              {section.items.map((item, i) => (
                <div key={i} className="mb-3">
                  {(item as any).href ? (
                    <a
                      href={(item as any).href}
                      className="text-white/80 hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <>
                      <p>{item.name}</p>
                      <p className="text-white/60 text-xs">{(item as any).sub}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/20 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Boba House. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <p className="hover:text-white cursor-pointer transition">
            Privacy Policy
          </p>
          <p className="hover:text-white cursor-pointer transition">
            Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
