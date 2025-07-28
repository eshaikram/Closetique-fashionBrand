"use client";

import React from 'react';
import FilterButtons from './FilterButtons'; // Adjust path if needed

export default function ProductPageHeader({
  filters = ['All', 'Men', 'Women', '2-Piece', '3-Piece', 'In Stock', 'Out Of Stock'],
  onAddProductClick,
  onSearchChange,
  onClearFilters,
}) {
  return (
    <div className="w-full p-6">
      {/* Title & Filters */}
      <div className="flex flex-wrap gap-10 mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <FilterButtons filters={filters} />
      </div>

      {/* Add Product + Search & Clear */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={onAddProductClick}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg mb-5"
        >
          Add Product
        </button>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search all columns..."
              onChange={onSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </span>
          </div>

          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
