import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    feedback: "The bubble tea is amazing! Fast delivery and so tasty.",
    avatar: "/Brown.png",
  },
  {
    id: 2,
    name: "Mark Wilson",
    feedback: "My favorite spot for smoothies and matcha! Highly recommend.",
    avatar: "/white.png",
  },
  {
    id: 3,
    name: "Sophie Lee",
    feedback: "Love the vibrant flavors and the cozy vibe of the store.",
    avatar: "/Avatars.png",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#FDF4F6] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#4B2E2E]">
          What People Say
        </h2>
        <p className="mt-4 text-[#6B4B4B] text-lg md:text-xl">
          Hear from our happy customers and their bubble tea experience!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {testimonials.map((testi) => (
          <div
            key={testi.id}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition"
          >
            <p className="text-[#4B2E2E] text-lg">"{testi.feedback}"</p>
            <div className="flex items-center gap-4 mt-6">
              <Image
                src={testi.avatar}
                width={50}
                height={50}
                alt={testi.name}
                className="rounded-full"
              />
              <span className="text-[#4B2E2E] font-semibold">{testi.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
