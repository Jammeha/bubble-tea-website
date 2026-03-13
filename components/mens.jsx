import Image from "next/image";
import Link from "next/link";
import { drinks } from "@/components/drink/drinks";

const Mens = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-16 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#FDF4F6] rounded-full blur-[150px] opacity-70"></div>
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <h2 className="text-[#E88997] uppercase tracking-[0.4em] text-xs font-black mb-4">
          The Milk Tea & Fruit Tea Collection
        </h2>
        <h1 className="text-5xl md:text-7xl font-black text-[#4B2E2E] tracking-tight">
          Our <span className="text-[#E88997]">Specials</span>
        </h1>
        <p className="mt-6 text-[#6B4B4B] text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-80">
          Hand-crafted delights made with the finest local and imported ingredients.
        </p>
      </div>

      {/* Drinks Grid — only first 3 */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16 relative z-10">
        {drinks.slice(0, 3).map((drink) => (
          <Link key={drink.id} href={`/menu/${drink.slug}`} className="group relative">
            <div className="h-full bg-[#4B2E2E] rounded-[3rem] p-10 flex flex-col items-center border border-[#5C3B3B] shadow-[0_15px_45px_rgba(0,0,0,0.2)] hover:shadow-[0_45px_90px_rgba(75,46,46,0.4)] transition-all duration-700 hover:-translate-y-4">
              
              {drink.isSpecial && (
                <div className="absolute top-8 left-0 bg-[#E88997] text-[#4B2E2E] py-1.5 px-6 rounded-r-full text-[0.65rem] font-black uppercase tracking-[0.15em] z-20 shadow-lg">
                  Must Try
                </div>
              )}

              <div className="relative w-56 h-56 md:w-64 md:h-64 mb-6">
                <div className="absolute inset-0 bg-pink-400/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  className="object-contain relative z-10 drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="text-center w-full mt-auto text-white">
                <h3 className="font-black text-2xl md:text-3xl leading-tight mb-2 tracking-tight">
                  {drink.name}
                </h3>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-[1px] w-4 bg-[#E88997]/50"></div>
                  <p suppressHydrationWarning className="text-[#E88997] text-xl font-black">
                    D{drink.price.toFixed(2)}
                  </p>
                  <div className="h-[1px] w-4 bg-[#E88997]/50"></div>
                </div>
                
                <div suppressHydrationWarning className="inline-flex bg-[#E88997] text-[#4B2E2E] px-10 py-4 rounded-full font-black text-sm hover:bg-white transition-all duration-300 shadow-md group-hover:scale-105 active:scale-95">
                  Order Now →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Go To Menu Button */}
      <div className="flex justify-center mt-20 relative z-10">
        <Link href="/menu">
          <button suppressHydrationWarning className="group bg-transparent border-2 border-[#4B2E2E] text-[#4B2E2E] px-12 py-5 rounded-full text-lg font-black hover:bg-[#4B2E2E] hover:text-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1">
            Explore Full Menu 
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-3 ml-3">→</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Mens;
