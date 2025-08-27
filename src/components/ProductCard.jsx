"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { useWishlist } from "@/lib/WishlistContext";

export default function ProductCard({
  id,
  title,
  image,
  price,
  discount = 0,
  rating = 4.5,
  color = "Default",
  quantity = 1,
}) {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if this product is already in wishlist
  useEffect(() => {
    const exists = wishlist.some((item) => item.id === id);
    setIsFavorite(exists);
  }, [wishlist, id]);

  const formattedPrice = !isNaN(price) ? Number(price).toFixed(2) : "0.00";

  const discountedPrice =
    discount > 0
      ? (price * (1 - discount / 100)).toFixed(2)
      : formattedPrice;

  const handleWishlist = (e) => {
    e.preventDefault(); // stop Link navigation
    if (isFavorite) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        title,
        image,
        price,
        discount,
        rating,
        color,
        quantity,
      });
    }
  };

  return (
    <Link href={`/product-detail/${id}`}>
      <div className="relative bg-white hover:shadow-xl transition-all duration-300 group overflow-hidden border cursor-pointer rounded-lg">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 z-10 rounded">
            {discount}% OFF
          </div>
        )}

        {/* Product Image */}
        <div className="relative w-full h-58 sm:h-80 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover min-h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Product Details */}
        <div className="relative p-3 sm:p-5 space-y-2 sm:space-y-3">
          {/* Heart Icon */}
          <button
            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-gray-100 rounded-full shadow-md hover:bg-orange-200 hover:shadow-lg transition-all duration-200 z-10"
            onClick={handleWishlist}
          >
            <Heart
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
                isFavorite ? "text-black fill-black" : "text-black"
              }`}
              strokeWidth={2}
            />
          </button>

          <h3 className="text-base sm:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  i < Math.round(rating)
                    ? "text-orange-400 fill-orange-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-600">
              ({rating.toFixed(1)})
            </span>
          </div>

          <div className="text-xs sm:text-sm text-gray-500 font-medium">
            Best Seller
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            {discount > 0 ? (
              <>
                <p className="bg-orange-100 text-orange-600 font-semibold text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-1.5 rounded">
                  ${discountedPrice}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 line-through">
                  ${formattedPrice}
                </p>
              </>
            ) : (
              <p className="bg-orange-100 text-orange-600 font-semibold text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-1.5 rounded">
                ${formattedPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
