"use client";
import React from "react";
import ProductCard from "../ProductCard";
import SectionHeader from "./SectionHeader";

const newArrivalProducts = [
  {
    id: 1,
    title: "Classic Denim Jacket",
    image: "https://saraclothes.com/cdn/shop/products/000SPFCLSV411_540x_36ee9f67-f8a3-44c4-8191-06d0699d5cba.jpg?v=1619870365",
    price: 89.99,
    discount: 10,
    rating: 4.6,
    badge: "New",
  },
  {
    id: 2,
    title: "Slim Fit Chinos",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 59.99,
    discount: 15,
    rating: 4.4,
    badge: "New",
  },
  {
    id: 3,
    title: "Floral Maxi Dress",
    image: "https://saraclothes.com/cdn/shop/products/000SPRPOPV48_1_540x_d1093f54-841f-4cb4-8602-90b7fcf537cb.jpg?v=1619870609",
    price: 79.99,
    discount: 20,
    rating: 4.8,
    badge: "New",
  },
  {
    id: 4,
    title: "Crew Neck Sweater",
    image: "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 49.99,
    discount: 0,
    rating: 4.5,
    badge: "New",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="section-container">
        <SectionHeader
          eyebrow="Fresh in"
          title="New Arrivals"
          subtitle="The latest drops, added to the collection this week."
          href="/products"
          linkLabel="View All"
          accent="orange"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivalProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
