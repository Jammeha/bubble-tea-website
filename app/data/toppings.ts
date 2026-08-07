export interface Topping {
  id: number;
  name: string;
  price: number;
}

export const toppings: Topping[] = [
  {
    id: 1,
    name: "Tapioca Pearls",
    price: 100,
  },
  {
    id: 2,
    name: "Popping Pearls",
    price: 150,
  },
  {
    id: 3,
    name: "Blended Slushie",
    price: 50,
  },
];
