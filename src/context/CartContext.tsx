"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedOption?: string, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  openSearch: () => void;
  closeSearch: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("habat_alshahd_cart");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load cart:", e);
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("habat_alshahd_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart:", e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedOption?: string,
    notes?: string
  ) => {
    const itemId = `${product.id}-${selectedOption || "default"}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          selectedOption,
          notes,
          image: product.image,
          unit: product.unit,
        },
      ];
    });
    showToast(`تمت إضافة "${product.name}" إلى سلة المشتريات`);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isSearchOpen,
        setIsSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-brown text-cream-light px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gold/40 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
