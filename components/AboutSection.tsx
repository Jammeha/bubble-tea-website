"use client";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="relative bg-[#FFF0F2] py-20 px-6 md:px-16 overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#E88997] opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-20 right-16 w-32 h-32 rounded-full bg-[#F7D9DC] opacity-30 animate-bounce-slower"></div>
      <div className="absolute top-1/2 right-0 w-16 h-16 rounded-full bg-[#EEC1C8] opacity-25 animate-bounce-slow"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Text */}
        <div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#4B2E2E] mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E88997] to-[#F7D9DC]">
              About Our Bubble Tea
            </span>
          </h2>
          <p className="mt-6 text-[#6B4B4B] text-lg md:text-xl max-w-lg">
            At Bubbles, we craft each bubble tea with love and care. Using the
            freshest ingredients and chewy tapioca pearls, every cup is made to
            delight your taste buds. Join us for a sweet, fresh experience and
            discover flavors you’ll fall in love with!
          </p>
          <button className="mt-8 bg-[#4B2E2E] text-white px-8 py-3 rounded-full hover:opacity-90 transition">
            Learn More
          </button>
        </div>

        {/* Images */}
        <div className="relative w-full h-80 md:h-96 flex justify-center items-center">
          <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/hotpink.png"
              alt="bubble tea preparation"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-12 w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#E88997]">
            <Image
              src="/coco.png"
              alt="boba closeup"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Optional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#FFE8EC] opacity-30 pointer-events-none"></div>
    </section>
  );
};

export default AboutSection;
