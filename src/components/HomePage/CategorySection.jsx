"use client";
import React from "react";
import CategoryCard from "../CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { title: "Men", image: "https://images.unsplash.com/photo-1593032465173-37b3822c9733" },
  { title: "Women", image: "https://images.unsplash.com/photo-1583394831826-4e7a0e9f1b9e" },
  { title: "Unstitched", image: "https://images.pexels.com/photos/3760915/pexels-photo-3760915.jpeg" },
  { title: "3 Piece", image: "https://images.pexels.com/photos/1094130/pexels-photo-1094130.jpeg" },
  { title: "2 Piece", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf" },
  { title: "1 Piece", image: "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg" },
  { title: "Lawn Collection", image: "https://images.pexels.com/photos/3760916/pexels-photo-3760916.jpeg" },
  { title: "Khaddar Collection", image: "https://images.pexels.com/photos/3760917/pexels-photo-3760917.jpeg" },
  { title: "Cotton Collection", image: "https://images.unsplash.com/photo-1583394831826-4e7a0e9f1b9e" },
  { title: "Linen Collection", image: "https://images.pexels.com/photos/3760918/pexels-photo-3760918.jpeg" },
  { title: "Silk Suits", image: "https://images.unsplash.com/photo-1618241264950-4e5e9e0b5e7a" },
  { title: "Wash & Wear", image: "https://images.pexels.com/photos/1094131/pexels-photo-1094131.jpeg" },
  { title: "Formal Wear", image: "https://images.unsplash.com/photo-1562572159-4efc207f5aff" },
  { title: "Casual Wear", image: "https://images.unsplash.com/photo-1591369821896-68a5a83a9d87" },
  { title: "Kids", image: "https://images.pexels.com/photos/36029/pexels-photo.jpg" },
  { title: "New Arrivals", image: "https://images.unsplash.com/photo-1578683012567-4e40e8d8e6b0" },
  { title: "Best Sellers", image: "https://images.pexels.com/photos/1094132/pexels-photo-1094132.jpeg" },
  { title: "Accessories", image: "https://images.unsplash.com/photo-1518047601542-79f18c655718" },
];

export default function CategorySection() {
  return (
    <section className="py-7 px-4 w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={10} // gap between slides
        slidesPerView={2} // default (mobile)
        navigation
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
      >
        {categories.map((item, idx) => (
          <SwiperSlide key={idx}>
            <CategoryCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
