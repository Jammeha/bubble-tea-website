export interface DrinkSize {
  name: string;
  price: number;
}

export const sizes: DrinkSize[] = [
  { name: "Regular", price: 0 },
  { name: "Large (Upgrade)", price: 100 },
];

export const sweetnessLevels: string[] = ["0%", "25%", "50%", "75%", "100%"];

export const iceLevels: string[] = ["No Ice", "Less Ice", "Regular Ice"];
