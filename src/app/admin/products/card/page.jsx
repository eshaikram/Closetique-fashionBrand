"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductPageHeader from '@/components/ResueableComponents/ProductPageHeader';
import axiosInstance from '@/lib/axiosInstance';
import AddProductPopup from '@/components/Popup-Pages/AddProductPopup';

export default function ProductCardsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(['All']);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  };


  const handleAddProductClick = () => {
    setIsPopupOpen(true);
  };
const handleProductAdded = (newProduct) => {
    setProducts([newProduct, ...products]);
    setSnackbar({
      open: true,
      message: 'Product added successfully',
      type: 'success'
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Add search logic here
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters(['All']);
    // Add clear filters logic here
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filters.includes('All') || filters.includes(product.category);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full bg-white border border-b rounded-2xl">
      <ProductPageHeader
        filters={['All', 'Men', 'Women', '2-Piece', '3-Piece', 'In Stock', 'Out Of Stock']}
        onAddProductClick={handleAddProductClick}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
      />
       {isPopupOpen && (
        <AddProductPopup 
          onClose={() => setIsPopupOpen(false)} 
          onProductAdded={handleProductAdded}
        />
      )}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              title={product.title}
               id={product._id}
              image={product.images && product.images[0]}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}