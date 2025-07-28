// components/HeroSlider.jsx
'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const banners = [
  {
    image: '/images/banner1.png',
    title: 'Summer Collection',
    subtitle: 'New arrivals from top brands',
  
  },
  {
    image: '/images/banner2.png',
    title: 'Unstitched Luxury',
    subtitle: 'Khaddar, Lawn, Cotton',

  },
  {
    image: '/images/banner3.png',
    title: 'Festive Picks',
    subtitle: 'Formal & Casual Wear',
  
  },
  //  {
  //   image: '/images/banner4.png',
  //   title: 'Festive Picks',
  //   subtitle: 'Formal & Casual Wear',

  // },
   {
    image: '/images/banner5.png',
    title: 'Festive Picks',
    subtitle: 'Formal & Casual Wear',

  },
];

export default function HeroSlider() {
  return (
    <div className="w-full max-w-8xl mx-auto rounded-xl overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true } }
        autoplay={{ delay: 3000 }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
  <div className={`relative flex items-center h-[480px] sm:h-[580px]`}>
    <div className="w-full h-full relative">
      <img
        src={banner.image}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </div>
</SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}
