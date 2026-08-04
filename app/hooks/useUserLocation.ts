// "use client";
// import { useState, useEffect } from "react";

// export default function useUserLocation() {
//   const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
//     null,
//   );

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCoords({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         () => console.log("User denied location"),
//       );
//     }
//   }, []);

//   return coords;
// }
