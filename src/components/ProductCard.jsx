// components/ProductCard.jsx
import React from 'react';
import Link from 'next/link';

export default function ProductCard({ id, title, image, price }) {
  const formattedPrice = !isNaN(price) ? Number(price).toFixed(2) : '0.00';

  return (
    <Link href={`/product-detail/${id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden border border-gray-300 cursor-pointer">
        <div className="relative w-full h-60 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
          <div className="text-sm text-gray-500">Best Seller</div>
          <p className="inline-block bg-orange-100 text-orange-600 font-semibold text-sm px-3 py-1 rounded-full">
            ${formattedPrice}
          </p>
        </div>
      </div>
    </Link>
  );
}
