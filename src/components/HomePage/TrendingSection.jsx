'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import SectionHeader from './SectionHeader';
import axiosInstance from '@/lib/axiosInstance';

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden">
      <div className="aspect-[4/5] bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function TrendingSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.products || [];
        if (active) setProducts(data.slice(0, 8));
      } catch (err) {
        if (active) setError('Failed to load trending products');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-8 sm:py-12">
      <div className="section-container">
        <SectionHeader
          eyebrow="What everyone loves"
          title="Trending Now"
          subtitle="The most-loved styles across our community right now."
          href="/products"
          linkLabel="See Trending"
          accent="orange"
        />

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-gray-500 py-8">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            New trending products coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                id={product._id || product.id}
                title={product.title}
                image={
                  (product.images && product.images[0]) ||
                  product.image ||
                  '/images/image.jpg'
                }
                price={product.price}
                discount={product.discount || 0}
                rating={product.rating || 4.5}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
