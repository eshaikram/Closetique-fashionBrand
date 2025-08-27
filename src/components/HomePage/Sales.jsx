"use client";
import React from "react";
import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";

const saleProducts = [
  {
    id: 1,
    title: "Casual Cotton Blazer",
    image: "https://images.unsplash.com/photo-1593032468441-5326e0d44a8a?q=80&w=800&auto=format&fit=crop",
    price: 99.99,
    discount: 15,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Slim Fit Polo Shirt",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 39.99,
    discount: 10,
    rating: 4.3,
  },
  {
    id: 3,
    title: "Knit Cardigan",
    image: "https://images.unsplash.com/photo-1578932750297-0e2e4d7c24b7?q=80&w=800&auto=format&fit=crop",
    price: 59.99,
    discount: 20,
    rating: 4.6,
  },
  {
    id: 4,
    title: "Tailored Shorts",
    image: "https://images.pexels.com/photos/5256612/pexels-photo-5256612.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 34.99,
    discount: 12,
    rating: 4.4,
  },
];

export default function Sales() {
  return (
    <section className="py-10 sm:py-16 ">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Sales
          </h2>
          <a
            href="/sales"
            className="flex items-center text-blue-600 font-semibold text-sm sm:text-base hover:text-blue-700 transition-colors duration-200"
          >
            Explore Sales <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {saleProducts.map((product) => (
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