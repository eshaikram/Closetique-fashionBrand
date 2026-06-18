"use client";
import React from "react";
import ProductCard from "../ProductCard";
import SectionHeader from "./SectionHeader";

const dealProducts = [
  {
    id: 1,
    title: "Luxury Cashmere Coat",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
    price: 199.99,
    discount: 30,
    rating: 4.8,
    badge: "Hot Deal",
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
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    price: 249.99,
    discount: 40,
    rating: 4.9,
    badge: "Hot Deal",
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
    <section className="py-8 sm:py-12">
      <div className="section-container">
        <SectionHeader
          eyebrow="Save big"
          title="Exclusive Deals"
          subtitle="Premium pieces at unbeatable prices — while stocks last."
          href="/products"
          linkLabel="Grab Deals Now"
          accent="red"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
