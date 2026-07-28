"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Check } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useWishlist } from "@/lib/WishlistContext";
import { useCart } from "@/lib/CartContext";

export default function ProductCard({
  id,
  title,
  image,
  price,
  discount = 0,
  rating = 4.5,
  color = "Default",
  quantity = 1,
  badge,
}) {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setIsFavorite(wishlist.some((item) => item.id === id));
  }, [wishlist, id]);

  const formattedPrice = !isNaN(price) ? Number(price).toFixed(2) : "0.00";
  const discountedPrice =
    discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : formattedPrice;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, title, image, price, discount, rating, color, quantity });
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      title,
      image,
      price: Number(discountedPrice),
      color,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link href={`/product-detail/${id}`} className="block h-full">
      <div className="relative flex flex-col h-full bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden rounded-2xl">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow">
              {discount}% OFF
            </span>
          )}
          {badge && (
            <span className="bg-gray-900 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow">
              {badge}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-orange-50 transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
              isFavorite ? "text-orange-500 fill-orange-500" : "text-gray-700"
            }`}
          />
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[5/6] overflow-hidden bg-gray-100">
          {imgError ? (
            <div className="w-full h-full grid place-items-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 text-sm">
              Image unavailable
            </div>
          ) : (
            <CldImage
              src={image}
              alt={title}
              width={400}
              height={500}
              crop="fill"
              format="webp"
              quality="auto"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Quick add to cart */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-colors ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-gray-900 text-white hover:bg-orange-500"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 p-3 gap-1.5">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.round(rating)
                    ? "text-orange-400 fill-orange-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {Number(rating).toFixed(1)}
            </span>
          </div>

          <div className="mt-auto flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${formattedPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
