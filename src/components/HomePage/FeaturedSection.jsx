import React from 'react';
import ProductCard from '../ProductCard';

// Add unique `id` values to each product
const featured = [
  { id: '1', title: 'Black Denim Jacket', image: '/products/jacket.jpg', price: 59.99 },
  { id: '2', title: 'Classic White Shirt', image: '/products/shirt.jpg', price: 29.99 },
  { id: '3', title: 'Summer Floral Dress', image: '/products/dress.jpg', price: 45.00 },
  { id: '4', title: 'Unique Floral Skirt', image: '/products/skirt.jpg', price: 39.99 }, // Removed duplicate
];

export default function FeaturedSection() {
  return (
    <section className="px-4 py-10 w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}