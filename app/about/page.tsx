import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";
export default function AboutPage() {
  return (
    <>
      <div className="bg-[#FFF0F2] min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="text-center py-20 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#4B2E2E]">
            About <span className="text-[#E88997]">Bubbles</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-[#6B4B4B]">
            We believe bubble tea should be fun, flavorful, and made with love.
            Our drinks are crafted using fresh ingredients and chewy tapioca
            pearls to create the perfect balance of sweetness and texture.
          </p>
        </section>

        {/* Story Section */}
        <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 pb-20">
          <div>
            <h2 className="text-3xl font-bold text-[#4B2E2E] mb-6">
              Our Story
            </h2>

            <p className="text-[#6B4B4B] mb-4">
              Bubbles started with a simple idea — create bubble tea that brings
              people together. From classic milk teas to exciting fruit blends,
              every drink is carefully crafted to deliver a unique experience.
            </p>

            <p className="text-[#6B4B4B]">
              Our mission is to serve happiness in every cup. Whether you're
              grabbing a quick drink or hanging out with friends, Bubbles is
              your place for sweet moments.
            </p>

            <button className="mt-8 bg-[#4B2E2E] text-white px-8 py-3 rounded-full hover:opacity-90">
              Explore Our Menu
            </button>
          </div>

          <div className="relative h-[400px]">
            <Image
              src="/hotpink.png"
              alt="bubble tea"
              fill
              className="object-contain"
            />
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#FFE8EC] py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <h3 className="text-xl font-bold text-[#4B2E2E] mb-3">
                Fresh Ingredients
              </h3>
              <p className="text-[#6B4B4B]">
                We only use the freshest tea leaves and natural flavors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md">
              <h3 className="text-xl font-bold text-[#4B2E2E] mb-3">
                Handmade Drinks
              </h3>
              <p className="text-[#6B4B4B]">
                Every drink is handcrafted by our tea experts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md">
              <h3 className="text-xl font-bold text-[#4B2E2E] mb-3">
                Unique Flavors
              </h3>
              <p className="text-[#6B4B4B]">
                Discover exciting flavors you won't find anywhere else.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
