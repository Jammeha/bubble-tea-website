"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  qty?: number;
  image?: string;
  size?: any;
  sweetness?: string;
  ice?: string;
  topping?: any;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  increaseQty: (id: string | number) => void;
  decreaseQty: (id: string | number) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  isCartOpen: false,
  setIsCartOpen: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  totalPrice: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id: string | number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string | number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max((item.qty || 1) - 1, 1) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
