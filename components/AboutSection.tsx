"use client";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about-section" className="relative bg-white py-28 px-6 md:px-16 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FDF4F6] rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#F7D9DC] rounded-full blur-[100px] opacity-40"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-20 relative z-10">
        {/* Images Side */}
        <div className="relative order-2 lg:order-1">
          <div className="relative z-20 w-full max-w-[450px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(75,46,46,0.15)] border-8 border-white group">
            <Image
              src="/hotpink.png" 
              alt="Bubbles premium tea"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Floating Secondary Image */}
          <div className="absolute top-[-15%] right-[-5%] md:right-[-10%] z-30 w-[180px] md:w-[240px] aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-4 border-white rotate-6 hover:rotate-0 transition-all duration-500">
            <Image
              src="/coco.png"
              alt="Fresh ingredients"
              fill
              className="object-cover"
            />
          </div>

          {/* Decorative Glow */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#E88997]/20 rounded-full blur-[60px] z-10"></div>
        </div>

        {/* Text Side */}
        <div className="order-1 lg:order-2">
          <h2 className="text-[#E88997] uppercase tracking-[0.4em] text-xs font-black mb-6">
            The Bubbles Story
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-[#4B2E2E] leading-[1.1] mb-8 tracking-tight">
            Crafting <span className="text-[#E88997]">Magic</span> <br /> 
            In Every Cup
          </h1>
          
          <div className="space-y-6 text-[#6B4B4B] text-lg md:text-xl leading-relaxed opacity-90 max-w-xl">
            <p className="font-medium">
              At Bubbles, we don&apos;t just make tea; we curate experiences. Born in the heart of The Gambia, our mission is to bring a world-class bubble tea culture to our community.
            </p>
            <p>
              From the finest hand-picked tea leaves to our signature chewy tapioca pearls, every ingredient is selected for its purity and flavor. We believe in the power of a perfect sip to brighten your day.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <button suppressHydrationWarning className="bg-[#4B2E2E] text-white px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#5C3B3B] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95">
              Discover Our Roots
            </button>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#F7D9DC] overflow-hidden relative shadow-md">
                     <div className="absolute inset-0 bg-[#E88997]/20"></div>
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold text-[#4B2E2E]/60 uppercase tracking-wider">
                Loved by 5000+ tea fans
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
