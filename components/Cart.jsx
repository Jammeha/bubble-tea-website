// "use client";
// import React from "react";

// export default function Cart({ cart, removeFromCart }) {
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="bg-brandPink border border-brandBrown p-4 rounded shadow-md w-full max-w-sm">
//       <h2 className="text-xl font-bold text-brandBrown mb-2">Your Cart</h2>
//       {cart.length === 0 && <p className="text-brandBrown">Cart is empty</p>}

//       <ul className="space-y-2">
//         {cart.map((item, index) => (
//           <li key={index} className="flex justify-between items-center">
//             <div className="text-brandBrown">
//               {item.name} ({item.size}, {item.ice}) x{item.quantity}
//             </div>
//             <div className="flex gap-2 items-center text-brandBrown">
//               ${(item.price * item.quantity).toFixed(2)}
//               <button
//                 className="text-red-500 font-bold hover:text-red-700"
//                 onClick={() => removeFromCart(index)}
//               >
//                 X
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <p className="font-semibold mt-2 text-brandBrown">
//         Total: ${total.toFixed(2)}
//       </p>
//     </div>
//   );
// }
