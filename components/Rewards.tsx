"use client";
import Image from "next/image";
import { useState } from "react";

const rewardsData = [
  {
    id: 1,
    title: "Earn Points",
    desc: "Get points for every order you place!",
    icon: "/CardCode.png",
    gradient: "bg-gradient-to-br from-[#F7D9DC] to-[#E88997]",
    action: () => alert("Points are earned for every purchase!"),
  },
  {
    id: 2,
    title: "Redeem Rewards",
    desc: "Use points to enjoy free drinks and discounts.",
    icon: "/pokal.png",
    gradient: "bg-gradient-to-br from-[#EEC1C8] to-[#F7D9DC]",
    action: () => alert("Redeem points for your favorite drinks!"),
  },
  {
    id: 3,
    title: "Exclusive Offers",
    desc: "Get members-only deals and surprises!",
    icon: "/Award.png",
    gradient: "bg-gradient-to-br from-[#E88997] to-[#F7D9DC]",
    action: () => alert("Check out exclusive offers available now!"),
  },
];

const Rewards = () => {
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    alert("🎉 You are now part of the Bubbles Rewards Program!");
  };

  return (
    <section className="bg-[#FFF0F2] py-20 px-6 md:px-16 text-center relative overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#E88997] opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-20 right-16 w-28 h-28 rounded-full bg-[#F7D9DC] opacity-30 animate-bounce-slower"></div>

      <h2 className="text-5xl font-extrabold text-[#4B2E2E] mb-4">
        Rewards Program
      </h2>
      <p className="text-[#6B4B4B] text-lg md:text-xl max-w-2xl mx-auto">
        Earn points for every bubble tea purchase and redeem them for discounts,
        free drinks, and exclusive offers. Join our rewards program today!
      </p>

      {/* Rewards Cards */}
      <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8">
        {rewardsData.map((reward) => (
          <div
            key={reward.id}
            onClick={reward.action}
            className={`group cursor-pointer ${reward.gradient} text-white p-8 rounded-3xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl w-72 flex flex-col items-center`}
          >
            <div className="w-16 h-16 mb-4">
              <Image
                src={reward.icon}
                alt={reward.title}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">{reward.title}</h3>
            <p>{reward.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-12">
        {joined ? (
          <button className="bg-[#E88997] text-[#4B2E2E] px-10 py-3 rounded-full cursor-not-allowed opacity-80">
            🎉 Joined!
          </button>
        ) : (
          <button
            onClick={handleJoin}
            className="bg-[#4B2E2E] text-white px-10 py-3 rounded-full hover:opacity-90 transition"
          >
            Join Now
          </button>
        )}
      </div>
    </section>
  );
};

export default Rewards;
