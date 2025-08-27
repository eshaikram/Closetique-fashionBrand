"use client";
import React from "react";
import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";

const newArrivalProducts = [
  {
    id: 1,
    title: "Classic Denim Jacket",
    image: "https://saraclothes.com/cdn/shop/products/000SPFCLSV411_540x_36ee9f67-f8a3-44c4-8191-06d0699d5cba.jpg?v=1619870365",
    price: 89.99,
    discount: 10,
    rating: 4.6,
  },
  {
    id: 2,
    title: "Slim Fit Chinos",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 59.99,
    discount: 15,
    rating: 4.4,
  },
  {
    id: 3,
    title: "Floral Maxi Dress",
    image: "https://saraclothes.com/cdn/shop/products/000SPRPOPV48_1_540x_d1093f54-841f-4cb4-8602-90b7fcf537cb.jpg?v=1619870609",
    price: 79.99,
    discount: 20,
    rating: 4.8,
  },
  {
    id: 4,
    title: "Crew Neck Sweater",
    image: "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 49.99,
    discount: 0,
    rating: 4.5,
  },
];

export default function NewArrivals() {
  return (
    <section className="py-10 sm:py-16 ">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            New Arrivals
          </h2>
          <a
            href="/shop"
            className="flex items-center text-orange-600 font-semibold text-sm sm:text-base hover:text-orange-700 transition-colors duration-200"
          >
            View All <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivalProducts.map((product) => (
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