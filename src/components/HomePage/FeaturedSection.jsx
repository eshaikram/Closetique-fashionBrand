"use client";
import React from "react";
import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";

// Dummy placeholder images
const featured = [
  {
    id: "1",
    title: "Black Denim Jacket",
    image:
      "https://cdn.shopify.com/s/files/1/1592/0041/files/sustaibable-sapphire-stories.jpg?v=1700130123",
    price: 59.99,
    discount: 10,
    rating: 4.5,
  },
  {
    id: "2",
    title: "Classic White Shirt",
    image:
      "https://saraclothes.com/cdn/shop/products/000SPFCLSV411_540x_36ee9f67-f8a3-44c4-8191-06d0699d5cba.jpg?v=1619870365",
    price: 29.99,
    discount: 0,
    rating: 4.3,
  },
  {
    id: "3",
    title: "Summer Floral Dress",
    image:
      "https://saraclothes.com/cdn/shop/products/000SPRPOPV48_1_540x_d1093f54-841f-4cb4-8602-90b7fcf537cb.jpg?v=1619870609",
    price: 45.0,
    discount: 15,
    rating: 4.7,
  },
  {
    id: "4",
    title: "Unique Floral Skirt",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj0yyvogEsOE5W6jTTbx5UBW2sz4D3ohJ0zEsPsbA1RT20uOGuHD7sqKeLWGunGHrLE_k&usqp=CAU",
    price: 39.99,
    discount: 5,
    rating: 4.4,
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-10 sm:py-16 ">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Featured Products
          </h2>
          <a
            href="/products"
            className="flex items-center text-purple-600 font-semibold text-sm sm:text-base hover:text-purple-700 transition-colors duration-200"
          >
            View All Products <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              discount={item.discount}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}