// "use client";
// import { useState } from "react";

// export default function DrinkCard({ drink, addToCart }) {
//   const [size, setSize] = useState("Medium");
//   const [ice, setIce] = useState("Normal Ice");
//   const [quantity, setQuantity] = useState(1);

//   return (
//     <div className="bg-brandPink border border-brandBrown p-4 rounded shadow-md flex flex-col gap-2">
//       <h3 className="text-lg font-semibold text-brandBrown">{drink.name}</h3>
//       <p className="text-sm text-brandBrown">Price: ${drink.price}</p>

//       <div>
//         <label className="text-brandBrown">Size: </label>
//         <select
//           className="border p-1 rounded ml-2"
//           value={size}
//           onChange={(e) => setSize(e.target.value)}
//         >
//           <option>Small</option>
//           <option>Medium</option>
//           <option>Large</option>
//         </select>
//       </div>

//       <div>
//         <label className="text-brandBrown">Ice: </label>
//         <select
//           className="border p-1 rounded ml-2"
//           value={ice}
//           onChange={(e) => setIce(e.target.value)}
//         >
//           <option>No Ice</option>
//           <option>Less Ice</option>
//           <option>Normal Ice</option>
//           <option>Extra Ice</option>
//         </select>
//       </div>

//       <div>
//         <label className="text-brandBrown">Qty: </label>
//         <input
//           type="number"
//           min={1}
//           value={quantity}
//           className="border p-1 rounded w-16 ml-2"
//           onChange={(e) => setQuantity(Number(e.target.value))}
//         />
//       </div>

//       <button
//         className="bg-brandBrown text-brandPink px-3 py-1 rounded mt-2 hover:bg-[#5c3d2e]"
//         onClick={() => addToCart({ ...drink, size, ice, quantity })}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }
