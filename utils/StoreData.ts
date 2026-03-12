// // 1️⃣ Type definition for a store
// export interface Store {
//   id: number;
//   name: string;
//   location: string;
//   lat: number;
//   lng: number;
//   deliveryTime: string;
//   pickupTime: string;
// }

// // 2️⃣ Mock store data
// const allStores: Store[] = [
//   {
//     id: 1,
//     name: "Senegambia Branch",
//     location: "Tropic Mall",
//     lat: 13.447,
//     lng: -16.672,
//     deliveryTime: "20–35 mins",
//     pickupTime: "10–12 mins",
//   },
//   {
//     id: 2,
//     name: "Latrikunda Branch",
//     location: "Latri Kunda German",
//     lat: 13.456,
//     lng: -16.664,
//     deliveryTime: "25–40 mins",
//     pickupTime: "10–12 mins",
//   },
//   {
//     id: 3,
//     name: "Kairaba Branch",
//     location: "Kairaba Market",
//     lat: 13.438,
//     lng: -16.685,
//     deliveryTime: "30–45 mins",
//     pickupTime: "15–20 mins",
//   },
//   {
//     id: 4,
//     name: "Bakau Branch",
//     location: "Bakau Shopping Center",
//     lat: 13.468,
//     lng: -16.664,
//     deliveryTime: "25–35 mins",
//     pickupTime: "10–15 mins",
//   },
// ];

// // 3️⃣ Simulated fetch function
// export async function fetchStores(query?: string): Promise<Store[]> {
//   await new Promise((resolve) => setTimeout(resolve, 300)); // simulate network delay
//   if (!query) return allStores;
//   return allStores.filter(
//     (store) =>
//       store.name.toLowerCase().includes(query.toLowerCase()) ||
//       store.location.toLowerCase().includes(query.toLowerCase()),
//   );
// }
