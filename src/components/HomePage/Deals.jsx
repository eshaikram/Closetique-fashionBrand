"use client";
import React from "react";
import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";

const dealProducts = [
  {
    id: 1,
    title: "Luxury Cashmere Coat",
    image: "https://images.unsplash.com/photo-1608063615781-e2ef1c33d1c9?q=80&w=800&auto=format&fit=crop",
    price: 199.99,
    discount: 30,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Designer Silk Scarf",
    image: "https://images.pexels.com/photos/3753115/pexels-photo-3753115.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 49.99,
    discount: 25,
    rating: 4.7,
  },
  {
    id: 3,
    title: "Tailored Wool Suit",
    image: "https://images.unsplash.com/photo-1593034509785-5b17ba49f683?q=80&w=800&auto=format&fit=crop",
    price: 249.99,
    discount: 40,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Embroidered Denim Shirt",
    image: "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 79.99,
    discount: 20,
    rating: 4.6,
  },
];

export default function Deals() {
  return (
    <section className="py-10 sm:py-16 ">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Exclusive Deals
          </h2>
          <a
            href="/deals"
            className="flex items-center text-red-600 font-semibold text-sm sm:text-base hover:text-red-700 transition-colors duration-200"
          >
            Grab Deals Now <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              discount={product.discount}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}