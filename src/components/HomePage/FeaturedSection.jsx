"use client";
import React from "react";
import ProductCard from "../ProductCard";
import SectionHeader from "./SectionHeader";

const featured = [
  {
    id: "1",
    title: "Black Denim Jacket",
    image:
      "https://cdn.shopify.com/s/files/1/1592/0041/files/sustaibable-sapphire-stories.jpg?v=1700130123",
    price: 59.99,
    discount: 10,
    rating: 4.5,
    badge: "Featured",
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
    badge: "Featured",
  },
  {
    id: "4",
    title: "Unique Floral Skirt",
    image:
      "https://images.unsplash.com/photo-1551048632-24e444b48a3e?w=600&q=80",
    price: 39.99,
    discount: 5,
    rating: 4.4,
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-8 sm:py-12">
      <div className="section-container">
        <SectionHeader
          eyebrow="Handpicked for you"
          title="Featured Products"
          subtitle="Our curated edit of standout pieces this season."
          href="/products"
          linkLabel="View All Products"
          accent="purple"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
