"use client";
import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get("/cart");
        if (res.data.success) {
          setCartItems(res.data.cart);
        }
      } catch (err) {
        console.error("Error fetching cart:", err.message);
      }
    };
    fetchCart();
  }, []);

  const subtotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // ✅ Update quantity
  const handleQuantityChange = async (id, color, newQuantity) => {
  try {
    const item = cartItems.find((i) => i.id === id && i.color === color);
    const diff = parseInt(newQuantity) - item.quantity;

    if (diff === 0) return;

    await axiosInstance.post("/cart", {
      id,
      color,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: diff, // ✅ send only difference
    });

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.color === color
          ? { ...item, quantity: parseInt(newQuantity) }
          : item
      )
    );
  } catch (err) {
    console.error("Error updating quantity:", err.message);
  }
};

  // ✅ Change color
  const handleColorChange = async (id, oldColor, newColor) => {
    try {
      // delete old
      await axiosInstance.delete(`/cart`, {
        params: { id, color: oldColor },
      });

      // add new
      const item = cartItems.find((i) => i.id === id && i.color === oldColor);
      await axiosInstance.post("/cart", {
        ...item,
        color: newColor,
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.color === oldColor
            ? { ...item, color: newColor }
            : item
        )
      );
    } catch (err) {
      console.error("Error changing color:", err.message);
    }
  };

  // ✅ Delete one item
  const handleDelete = async (id, color) => {
    try {
      await axiosInstance.delete("/cart", {
        params: { id, color },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => !(item.id === id && item.color === color))
      );
    } catch (err) {
      console.error("Error deleting item:", err.message);
    }
  };

  // ✅ Clear all items
  const handleClearCart = async () => {
    try {
      await axiosInstance.patch("/cart", { action: "clear" });
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err.message);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <p className="text-black text-base sm:text-lg font-medium bg-orange-100 p-4 rounded-lg text-center">
              Your cart is empty. Start shopping now!
            </p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 mb-4 bg-white rounded-lg shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300"
                >
                  {/* Image + Details */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-orange-300"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg sm:text-xl font-semibold text-black">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {item.title ===
                        "Simple Modern Minimalist Nordic Dining Chair for Home or Kitchen"
                          ? "Comfortable modern dining chair."
                          : ""}
                      </p>
                      <select
                        className="mt-2 sm:mt-3 p-2 text-sm border border-orange-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                        value={item.color}
                        onChange={(e) =>
                          handleColorChange(item.id, item.color, e.target.value)
                        }
                      >
                        <option value={item.color}>{item.color}</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                      </select>
                    </div>
                  </div>

                  {/* Quantity + Price + Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 mt-4 sm:mt-0">
                    <select
                      className="p-2 text-sm border border-orange-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-orange-500 w-20 transition-all duration-200"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          item.color,
                          e.target.value
                        )
                      }
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                    <p className="text-lg sm:text-xl font-bold text-orange-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    {/* Trash Icon */}
                    <button
                      onClick={() => handleDelete(item.id, item.color)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty Cart Button */}
              <button
                onClick={handleClearCart}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Empty Cart
              </button>
            </>
          )}
        </div>

        {/* Checkout Summary */}
        <div className="lg:col-span-1">
          <div className="p-5 sm:p-6 rounded-lg border border-orange-200 shadow-lg sticky top-4">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-3">
              <span className="text-sm sm:text-base">Subtotal</span>
              <span className="font-bold text-orange-500">${subtotal}</span>
            </div>
            <p className="text-xs sm:text-sm mb-4">
              Shipping, taxes, and discounts calculated at checkout.
            </p>
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full p-2 sm:p-3 mb-4 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all duration-200 text-sm"
            />
            <button className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 font-semibold text-sm sm:text-base">
              Proceed to Checkout
            </button>
            <p className="text-center text-xs sm:text-sm mt-4">
              Secured by Snipcart
            </p>
            <div className="flex justify-center gap-3 sm:gap-4 mt-4">
              <img
                src="/visa.png"
                alt="Visa"
                className="h-6 sm:h-8 filter brightness-0 invert"
              />
              <img
                src="/mastercard.png"
                alt="Mastercard"
                className="h-6 sm:h-8 filter brightness-0 invert"
              />
              <img
                src="/paypal.png"
                alt="PayPal"
                className="h-6 sm:h-8 filter brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
