// app/page.jsx or pages/index.jsx (for older Next.js)

import React from 'react';
import FeaturedSection from '@/components/HomePage/FeaturedSection';
import CategorySection from '@/components/HomePage/CategorySection';
import TrendingSection from '@/components/HomePage/TrendingSection';

import HeroSection from '@/components/HomePage/HeroSection';

export default function Home() {
  return (
    <main className="py-2 px-2">
      <HeroSection />
     
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
