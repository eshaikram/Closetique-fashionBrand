// app/page.jsx or pages/index.jsx (for older Next.js)

import React from 'react';
import FeaturedSection from '@/components/HomePage/FeaturedSection';
import CategorySection from '@/components/HomePage/CategorySection';
import TrendingSection from '@/components/HomePage/TrendingSection';
import NewArrivals from '@/components/HomePage/NewArrival';

import HeroSection from '@/components/HomePage/HeroSection';
import Deals from '@/components/HomePage/Deals';
import Sales from '@/components/HomePage/Sales';

export default function Home() {
  return (
    <main className="py-2 px-2">
      <HeroSection />
     
      <section className="mb-12 mt-5">
        <h2 className="text-2xl ml-5 text-center font-bold mb-6">Shop by Category</h2>
        <CategorySection />
      </section>

     

      <section>
        {/* <h2 className="text-2xl ml-5 font-bold mb-6">New Arrivals</h2> */}
        {/* <NewArrivals/> */}
      </section>
      <section >
  
        <FeaturedSection />
      </section>
      <section>
        {/* <h2 className="text-2xl ml-5 font-bold mb-6">New Arrivals</h2> */}
        <Sales/>
      </section>
      <section>
        {/* <h2 className="text-2xl ml-5 font-bold mb-6">New Arrivals</h2> */}
        <Deals/>
      </section>


      <section>
        <h2 className="text-2xl ml-5 font-bold mb-6">Trending Items</h2>
        <TrendingSection />
      </section>
    </main>
  );
}
