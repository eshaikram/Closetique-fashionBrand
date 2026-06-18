"use client";
import React from "react";
import CategoryCard from "../CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// Curated fashion categories with reliable Unsplash imagery.
// CategoryCard gracefully falls back to a branded tile if an image fails.
const categories = [
  { title: "Women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80", count: 248 },
  { title: "Men", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80", count: 192 },
  { title: "Kids", image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80", count: 86 },
  { title: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80", count: 134 },
  { title: "Lawn Collection", image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&q=80", count: 64 },
  { title: "Formal Wear", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80", count: 73 },
  { title: "Casual Wear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80", count: 158 },
  { title: "Accessories", image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&q=80", count: 97 },
  { title: "Footwear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80", count: 112 },
  { title: "New Arrivals", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80", count: 45 },
];

export default function CategorySection() {
  return (
    <section className="section-container">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
        className="!py-4"
      >
        {categories.map((item, idx) => (
          <SwiperSlide key={idx} className="!flex justify-center">
            <CategoryCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
