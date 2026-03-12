import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#F7D9DC] to-[#EEC1C8] px-10 py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-7xl font-bold text-[#4B2E2E] leading-tight">
            Sweet. Fresh.
          </h1>

          {/* Bubble Tea with zig-zag underline exactly matching text */}
          <h2 className="relative inline-block text-7xl italic text-[#E88997] mt-2">
            Bubble Tea
            <svg
              className="absolute left-0 -bottom-3 w-full h-6"
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
          </h2>

          <h1 className="text-7xl font-bold text-[#4B2E2E] mt-3">
            Made For You
          </h1>

          <p className="mt-6 text-[#6B4B4B] max-w-md text-lg">
            Experience the perfect blend of flavor, sweetness, and chewy pearls.
            Crafted with love for every bubble tea lover.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-[#4B2E2E] text-white px-8 py-3 rounded-full hover:opacity-90 transition" suppressHydrationWarning>
              Order Now
            </button>

            <button className="border border-[#4B2E2E] text-[#4B2E2E] px-8 py-3 rounded-full hover:bg-[#4B2E2E] hover:text-white transition" suppressHydrationWarning>
              View Menu
            </button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGES */}
        <div className="relative flex justify-center">
          <Image
            src="/hero.png"
            width={430}
            height={350}
            alt="milk splash"
            className="absolute top-10"
          />
          <div className="relative bottom-22 left-8">
            <Image
              src="/hero2.png"
              width={430}
              height={350}
              alt="bubble tea cups"
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
