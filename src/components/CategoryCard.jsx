"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CategoryCard({ title, image, count }) {
  const [errored, setErrored] = useState(false);
  const slug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));

  return (
    <Link
      href={`/products?category=${slug}`}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-orange-400 shadow-sm transition-all duration-300 group-hover:shadow-lg">
        {errored ? (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-200 grid place-items-center text-2xl font-serif font-semibold text-orange-700">
            {title.charAt(0)}
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setErrored(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="mt-3 text-sm sm:text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
        {title}
      </span>
      {count != null && (
        <span className="text-xs text-gray-400">{count} items</span>
      )}
    </Link>
  );
}
