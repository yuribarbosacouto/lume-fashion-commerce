"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getProductBySlug, Product } from "@/data/catalog";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
};

type AddToCartInput = {
  product: Product;
  color: string;
  size: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (input: AddToCartInput) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "lume-cart";

export function cartKey(item: Pick<CartItem, "slug" | "size" | "color">) {
  return `${item.slug}:${item.size}:${item.color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw) as CartItem[];
      return parsed.filter((item) => getProductBySlug(item.slug));
    } catch {
      window.localStorage.removeItem(storageKey);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      subtotal,
      itemCount,
      addItem({ product, color, size }) {
        const nextItem: CartItem = {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          color,
          size,
          quantity: 1,
        };
        const key = cartKey(nextItem);

        setItems((current) => {
          const exists = current.some((item) => cartKey(item) === key);
          if (!exists) return [...current, nextItem];
          return current.map((item) =>
            cartKey(item) === key ? { ...item, quantity: item.quantity + 1 } : item,
          );
        });
      },
      removeItem(key) {
        setItems((current) => current.filter((item) => cartKey(item) !== key));
      },
      updateQuantity(key, quantity) {
        if (quantity < 1) {
          setItems((current) => current.filter((item) => cartKey(item) !== key));
          return;
        }
        setItems((current) => current.map((item) => (cartKey(item) === key ? { ...item, quantity } : item)));
      },
      clearCart() {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
