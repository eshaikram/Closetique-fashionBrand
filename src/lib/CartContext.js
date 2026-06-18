"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "./axiosInstance";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Load cart from backend on mount (non-blocking).
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await axiosInstance.get("/cart");
        if (active && res.data.success) setCartItems(res.data.cart);
      } catch (err) {
        console.error("Error loading cart:", err.message);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  }, []);

  const addToCart = async (item) => {
    try {
      const res = await axiosInstance.post("/cart", item);
      if (res.data.success) {
        setCartItems((prev) => {
          const existingIndex = prev.findIndex(
            (i) => i.id === item.id && i.color === item.color
          );
          if (existingIndex > -1) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + item.quantity,
            };
            return updated;
          }
          return [...prev, item];
        });
        showToast("Item added to cart 🛒");
      }
    } catch (err) {
      console.error("Add to cart error:", err.message);
    }
  };

  const deleteFromCart = async (id, color) => {
    try {
      const res = await axiosInstance.delete("/cart", { params: { id, color } });
      if (res.data.success) {
        setCartItems(res.data.cart);
        showToast("Item removed ❌");
      }
    } catch (err) {
      console.error("Delete cart error:", err.message);
    }
  };

  const clearCart = async () => {
    try {
      const res = await axiosInstance.patch("/cart", { action: "clear" });
      if (res.data.success) {
        setCartItems([]);
        showToast("Cart cleared 🗑️");
      }
    } catch (err) {
      console.error("Clear cart error:", err.message);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, deleteFromCart, clearCart }}>
      {children}

      {/* Lightweight toast (replaces MUI Snackbar to keep the global bundle small) */}
      <div
        aria-live="polite"
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
          toast.show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg">
          {toast.message}
        </div>
      </div>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
