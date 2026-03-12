import Image from "next/image";
import Link from "next/link";
import { drinks } from "@/components/drink/drinks";

const Mens = () => {
  return (
    <section className="bg-[#FDF4F6] py-16 px-6 md:px-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#4B2E2E]">
          Our Drinks
        </h2>
        <p className="mt-4 text-[#6B4B4B] text-lg md:text-xl">
          Freshly made bubble tea, smoothies, and more. Choose your favorite!
        </p>
      </div>

      {/* Drinks Grid — only first 3 */}
      <div className="grid md:grid-cols-3 gap-10">
        {drinks.slice(0, 3).map((drink) => (
          <Link key={drink.id} href={`/menu/${drink.slug}`}>
            <div className="relative bg-[#4B2E2E] rounded-3xl p-6 flex flex-col items-center shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden">
              {drink.isSpecial && (
                <div className="absolute top-4 left-0 bg-[#E88997] text-[#4B2E2E] py-1 px-4 rounded-r-full text-xs font-bold uppercase tracking-wider z-20 shadow-md">
                  Special
                </div>
              )}
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-6 font-bold text-2xl text-white text-center">
                {drink.name}
              </h3>
              <p className="mt-2 text-[#E88997] font-semibold text-lg">
                ${drink.price.toFixed(2)}
              </p>
              <div className="mt-6 bg-[#E88997] text-[#4B2E2E] px-6 py-2 rounded-full hover:bg-[#d9788c] transition font-semibold" suppressHydrationWarning>
                Order Now →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Go To Menu Button */}
      <div className="flex justify-center mt-16">
        <Link href="/menu">
          <button className="bg-[#4B2E2E] text-white px-8 py-3 rounded-full text-lg hover:bg-[#3b2222] transition shadow-md" suppressHydrationWarning>
            Go To Full Menu →
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Mens;
