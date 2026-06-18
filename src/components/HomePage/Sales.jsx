"use client";
import React from "react";
import ProductCard from "../ProductCard";
import SectionHeader from "./SectionHeader";

const saleProducts = [
  {
    id: 1,
    title: "Casual Cotton Blazer",
    image: "https://images.unsplash.com/photo-1593032465175-50a4d3d5a4a8?w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
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
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="section-container">
        <SectionHeader
          eyebrow="Limited time"
          title="On Sale Now"
          subtitle="Grab your favorites before the prices go back up."
          href="/products"
          linkLabel="Explore Sales"
          accent="blue"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
