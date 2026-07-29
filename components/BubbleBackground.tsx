// "use client";

// import { useEffect, useState } from "react";

// interface Bubble {
//   id: number;
//   left: string;
//   top: string;
//   delay: string;
// }

// export default function BubbleBackground() {
//   const [bubbles, setBubbles] = useState<Bubble[]>([]);

//   useEffect(() => {
//     // Only run in client
//     const generated = Array.from({ length: 15 }).map((_, i) => ({
//       id: i,
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       delay: `${Math.random() * 5}s`,
//     }));
//     setBubbles(generated);
//   }, []);

//   return (
//     <div className="absolute inset-0 pointer-events-none overflow-hidden">
//       {bubbles.map((b) => (
//         <div
//           key={b.id}
//           className="absolute w-8 h-8 bg-pink-200 rounded-full opacity-70 animate-bounce-slow"
//           style={{
//             left: b.left,
//             top: b.top,
//             animationDelay: b.delay,
//           }}
//         ></div>
//       ))}
//     </div>
//   );
// }
