'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import axiosInstance from '@/lib/axiosInstance';

export default function TrendingBrands() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="py-10 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Trending Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.title}
            image={product.images[0] || '/placeholder-image.jpg'}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}