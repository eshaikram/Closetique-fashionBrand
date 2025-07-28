// app/page.jsx or pages/index.jsx (for older Next.js)

import React from 'react';
import FeaturedSection from '@/components/HomePage/FeaturedSection';
import CategorySection from '@/components/HomePage/CategorySection';
import TrendingSection from '@/components/HomePage/TrendingSection';
import HeroSlider from '@/components/HomePage/HeroSlider';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HeroSlider />
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Our Clothing Store</h1>

      <section className="mb-12">
        <h2 className="text-2xl ml-5 font-bold mb-6">Featured Products</h2>
        <FeaturedSection />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl ml-5 font-bold mb-6">Shop by Category</h2>
        <CategorySection />
      </section>

      <section>
        <h2 className="text-2xl ml-5 font-bold mb-6">Trending Items</h2>
        <TrendingSection />
      </section>
    </main>
  );
}
