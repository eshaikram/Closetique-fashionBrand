// app/page.js — Closetique homepage
import React from "react";
import HeroSection from "@/components/HomePage/HeroSection";
import BenefitsBar from "@/components/HomePage/BenefitsBar";
import SectionHeader from "@/components/HomePage/SectionHeader";
import CategorySection from "@/components/HomePage/CategorySection";
import FeaturedSection from "@/components/HomePage/FeaturedSection";
import NewArrivals from "@/components/HomePage/NewArrival";
import PromoBanner from "@/components/HomePage/PromoBanner";
import Sales from "@/components/HomePage/Sales";
import Deals from "@/components/HomePage/Deals";
import TrendingSection from "@/components/HomePage/TrendingSection";
import Testimonials from "@/components/HomePage/Testimonials";
import Newsletter from "@/components/HomePage/Newsletter";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <BenefitsBar />

      {/* Shop by Category */}
      <section className="py-8 sm:py-12">
        <div className="section-container">
          <SectionHeader
            eyebrow="Find your style"
            title="Shop by Category"
            subtitle="Browse our most popular collections."
          />
        </div>
        <CategorySection />
      </section>

      <FeaturedSection />

      <NewArrivals />

      <PromoBanner />

      <Sales />

      <Deals />

      <TrendingSection />

      <Testimonials />

      <Newsletter />
    </main>
  );
}
