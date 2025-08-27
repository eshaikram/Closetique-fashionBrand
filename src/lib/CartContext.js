"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import { Snackbar } from "@mui/material";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  // Load cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get("/cart");
        if (res.data.success) setCartItems(res.data.cart);
      } catch (err) {
        console.error("Error loading cart:", err.message);
      }
    };
    fetchCart();
  }, []);

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
    setTimeout(() => setSnackbar({ open: false, message: "" }), 3000);
  };

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
          updated[existingIndex].quantity += item.quantity;
          return updated;
        }
        return [...prev, item];
      });

      showSnackbar("Item added to cart 🛒");
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
        showSnackbar("Item removed ❌");
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
        showSnackbar("Cart cleared 🗑️");
      }
    } catch (err) {
      console.error("Clear cart error:", err.message);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, deleteFromCart, clearCart }}>
      {children}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
