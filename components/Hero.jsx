"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#F7D9DC] to-[#EEC1C8] px-10 py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* LEFT SIDE */}
        <div>
          {/* Unified Headline */}
          <h1 className="text-6xl lg:text-[5rem] font-bold text-[#4B2E2E] leading-[1.1] mb-6">
            Sweet. Fresh.<br />
            <span className="relative inline-block italic text-[#E88997] my-3">
              Bubble Tea
              <svg
                className="absolute left-0 -bottom-4 w-full h-8"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 10 Q10 0, 20 10 T40 10 T60 10 T80 10 T100 10 T120 10 T140 10 T160 10 T180 10 T200 10"
                  stroke="#E88997"
                  strokeWidth="3"
                  fill="transparent"
                />
              </svg>
            </span><br />
            Made For You
          </h1>

          <p className="mt-6 text-[#6B4B4B] max-w-md text-lg">
            Experience the perfect blend of flavor, sweetness, and chewy pearls.
            Crafted with love for every bubble tea lover.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/menu"
              className="bg-[#4B2E2E] text-white px-8 py-3.5 rounded-full hover:bg-[#E88997] hover:text-[#4B2E2E] transition-all font-bold shadow-lg inline-block"
              suppressHydrationWarning
            >
              Explore Menu 🧋
            </Link>

            <Link
              href="/about"
              className="border-2 border-[#4B2E2E] text-[#4B2E2E] px-8 py-3.5 rounded-full hover:bg-[#4B2E2E] hover:text-white transition-all font-bold inline-block"
              suppressHydrationWarning
            >
              About Us
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGES */}
        <div className="relative flex justify-center items-center h-[350px] md:h-[500px] mt-10 md:mt-0 w-full">
          {/* Background Splash */}
          {<Image
            src="/hero.png"
            width={480}
            height={400}
            alt="milk splash"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[90%] md:w-[110%] object-contain opacity-90"
          />}
          {/* Foreground Cups */}
          <div className="relative z-10 w-[85%] md:w-full flex justify-center mt-16 md:mt-24 ml-4 md:ml-12">
            <Image
              src="/hero2.png"
              width={450}
              height={380}
              alt="bubble tea cups"
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
