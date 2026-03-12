// "use client";

// import React from "react";

// interface Props {
//   name: string;
//   location: string;
//   time: string;
//   mode?: "delivery" | "pickup";
//   isNearest?: boolean;
// }

// export default function StoreCard({
//   name,
//   location,
//   time,
//   mode = "delivery",
//   isNearest = false,
// }: Props) {
//   return (
//     <div
//       className={`group bg-white rounded-3xl shadow-md hover:shadow-2xl transition p-8 border ${
//         isNearest ? "border-pink-500" : "border-pink-100"
//       }`}
//     >
//       {/* Icon + Store Info */}
//       <div className="flex items-center gap-4">
//         <div className="bg-pink-100 p-3 rounded-xl text-2xl">🧋</div>

//         <div>
//           <h3 className="text-xl font-bold text-gray-900">{name}</h3>
//           <p className="text-gray-500 text-sm">{location}</p>
//         </div>
//       </div>

//       {/* Delivery / Pickup time */}
//       <div className="mt-6 text-sm text-gray-600">
//         {mode === "delivery" ? "🚚 Delivery time: " : "⏱ Pickup ready: "} {time}
//         {isNearest && mode === "delivery" && (
//           <span className="ml-2 text-pink-500 font-semibold">
//             🚩 Closest to you!
//           </span>
//         )}
//       </div>

//       {/* Action button */}
//       <button className="mt-6 w-full bg-pink-500 text-white py-3 rounded-xl font-medium hover:bg-pink-600 transition">
//         {mode === "delivery"
//           ? "Order From This Store"
//           : "Pickup From This Store"}
//       </button>
//     </div>
//   );
// }
