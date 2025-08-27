"use client";
import React, { useState } from "react";
import { Trash2, Star } from "lucide-react";
import { useCart } from "@/lib/CartContext";

const WishlistCard = ({
  productId,
  image,
  title,
  color,
  quantity,
  price,
  discount,
  rating,
  onRemove,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { addToCart } = useCart();

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(productId);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error.message);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      title,
      image,
      price: discount > 0 ? price * (1 - discount / 100) : price,
      quantity: 1,
      color,
    });
    handleRemove(); // optional: remove from wishlist once added to cart
  };

  return (
    <div className="w-full flex flex-row items-center p-4 sm:p-5 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] max-w-7xl mx-auto">
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-br-lg rounded-tl-lg">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 ml-4 sm:ml-5 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-gray-500 text-sm">Color: {color}</p>
        <p className="text-gray-500 text-sm">Qty: {quantity}</p>

        {/* Rating */}
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating})</span>
        </div>
      </div>

      {/* Price + Actions */}
      <div className="flex flex-col items-end min-w-[120px] sm:min-w-[160px]">
        <p className="text-lg sm:text-xl font-bold text-purple-600">
          $
          {discount > 0
            ? (price * (1 - discount / 100)).toFixed(2)
            : price.toFixed(2)}
          {discount > 0 && (
            <span className="line-through text-sm text-gray-400 ml-2">
              ${price.toFixed(2)}
            </span>
          )}
        </p>

        <div className="mt-3 flex space-x-2">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:from-purple-600 hover:to-indigo-600 transition-all cursor-pointer"
          >
            Add to Cart
          </button>

          {/* Remove from Wishlist */}
          <button
            className={`p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors ${
              isRemoving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleRemove}
            disabled={isRemoving}
          >
            <Trash2 className="w-5 h-5 text-red-600 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
