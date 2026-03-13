import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Fatou Drammeh",
    feedback: "The best bubble tea in The Gambia! The Brown Sugar Milk is absolute perfection. Fast delivery to Senegambia too!",
    avatar: "/Avatars.png",
    rating: 5,
    color: "from-[#FF9A9E] to-[#FAD0C4]",
  },
  {
    id: 2,
    name: "Modou Jallow",
    feedback: "Bubbles is my daily ritual. The Fruit Teas are so refreshing, and the packaging is just beautiful. Premium quality everywhere.",
    avatar: "/Brown.png",
    rating: 5,
    color: "from-[#A18CD1] to-[#FBC2EB]",
  },
  {
    id: 3,
    name: "Kaddy Sowe",
    feedback: "Love the new store vibe! Chewy pearls, perfect sweetness, and friendly staff. Highly recommend for any boba fan.",
    avatar: "/thai.png",
    rating: 5,
    color: "from-[#FFECD2] to-[#FCB69F]",
  },
];

const Testimonials = () => {
  const [shakingCardId, setShakingCardId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setShakingCardId(id);
    setTimeout(() => setShakingCardId(null), 500);
  };

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-[#FDF4F6]">
      {/* Subtle Background Decorations */}
      <div className="absolute top-10 left-[10%] w-32 h-32 bg-[#E88997]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-[5%] w-64 h-64 bg-[#E88997]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="bg-[#E88997]/10 text-[#E88997] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] inline-block mb-6">
            Real Vibes Only
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-[#4B2E2E] tracking-tight mb-6">
            Our <span className="text-[#E88997]">Fam</span> Says
          </h1>
          <p className="text-[#6B4B4B] text-xl max-w-2xl mx-auto font-medium opacity-80">
            Don't just take our word for it. Join the thousands of boba lovers who've made Bubbles their second home.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {testimonials.map((testi, idx) => (
            <div
              key={testi.id}
              onClick={() => handleCardClick(testi.id)}
              className={`relative group p-1 rounded-[3rem] transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] ${
                shakingCardId === testi.id ? 'animate-shake' : ''
              }`}
            >
              <div className="relative bg-white border border-[#E88997]/10 group-hover:border-[#E88997]/30 p-10 rounded-[2.8rem] shadow-[0_20px_50px_rgba(75,46,46,0.05)] group-hover:shadow-[0_30px_60px_rgba(75,46,46,0.12)] transition-all duration-300 flex flex-col h-full">
                {/* Quote Icon */}
                <span className="text-7xl text-[#4B2E2E]/5 absolute top-6 right-10 select-none">"</span>
                
                {/* Ratings */}
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#E88997] text-xl">★</span>
                  ))}
                </div>

                <p className="text-[#4B2E2E] text-xl leading-relaxed mb-12 font-medium relative z-10 italic">
                  "{testi.feedback}"
                </p>

                <div className="mt-auto flex items-center gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#E88997] shadow-xl">
                      <Image
                        src={testi.avatar}
                        fill
                        alt={testi.name}
                        className="object-cover"
                      />
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#E88997] rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <span className="text-[10px] text-white font-bold">✓</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-[#4B2E2E] font-black text-lg leading-none mb-1 tracking-tight">
                      {testi.name}
                    </h4>
                    <span className="text-[#E88997] text-[10px] font-black uppercase tracking-widest">
                      Boba Enthusiast
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Call to Action */}
        <div className="mt-24 text-center">
           <div className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full border border-[#E88997]/20 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-[#4B2E2E] font-bold text-sm">Join the 100% happy tea club today!</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
