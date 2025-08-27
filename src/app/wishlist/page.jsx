// app/wishlist/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import WishlistCard from "@/components/WishlistCard";
import Link from "next/link";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist items on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axiosInstance.get("/wishlist");
        setItems(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Remove item from wishlist
  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`/wishlist/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item from wishlist.");
    }
  };

  if (loading) return <p className="p-6">Loading wishlist...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">
          Your wishlist is empty.{" "}
          <Link href="/" className="text-blue-500 underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <WishlistCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
