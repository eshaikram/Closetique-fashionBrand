"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, toSlug, fromSlug } from "@/lib/categories";
import axiosInstance from "@/lib/axiosInstance";


function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden">
      <div className="aspect-[5/6] bg-gray-200 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

function ProductsInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") || "";
  const categorySlug = searchParams.get("category") || "";
  const activeCategory = fromSlug(categorySlug);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("featured");
  const [term, setTerm] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => setTerm(searchQuery), [searchQuery]);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/products");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];
        if (active) setProducts(data);
      } catch (e) {
        if (active) setError("Failed to load products. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Update the URL query without a full navigation.
  const setParams = (next) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    router.push(`/products?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory) {
      const c = activeCategory.toLowerCase();
      list = list.filter((p) =>
        [p.category, p.gender, p.title, p.brand]
          .filter(Boolean)
          .some((f) => String(f).toLowerCase().includes(c))
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        [p.title, p.brand, p.category, p.description]
          .filter(Boolean)
          .some((f) => String(f).toLowerCase().includes(q))
      );
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "newest")
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

    return list;
  }, [products, activeCategory, searchQuery, sort]);

  const heading = searchQuery
    ? `Results for “${searchQuery}”`
    : activeCategory || "All Products";

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
        <div className="section-container py-8 sm:py-10">
          <nav className="text-sm text-gray-500 mb-2">
            <span className="hover:text-orange-600 cursor-pointer" onClick={() => router.push("/")}>Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{heading}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {heading}
          </h1>
        </div>
      </div>

      <div className="section-container py-8">
        {/* search + sort toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setParams({ search: term.trim() });
            }}
            className="relative flex-1 max-w-md"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-orange-400"
            />
          </form>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="lg:hidden inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Category sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Categories</h3>
              {activeCategory && (
                <button
                  onClick={() => setParams({ category: "" })}
                  className="text-xs text-orange-600 inline-flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setParams({ category: "" })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !activeCategory
                      ? "bg-orange-500 text-white font-medium"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  All Products
                </button>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setParams({ category: toSlug(c) })}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === c
                        ? "bg-orange-500 text-white font-medium"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Results */}
          <div>
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <p className="text-center text-gray-500 py-16">{error}</p>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-gray-800">
                  No products found
                </p>
                <p className="text-gray-500 mt-1">
                  Try a different search or category.
                </p>
                <button
                  onClick={() => setParams({ search: "", category: "" })}
                  className="mt-4 inline-flex rounded-full bg-orange-500 text-white px-6 py-2.5 text-sm font-semibold hover:bg-orange-600"
                >
                  View all products
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {filtered.length} product{filtered.length !== 1 && "s"} found
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filtered.map((p) => (
                    <ProductCard
                      key={p._id || p.id}
                      id={p._id || p.id}
                      title={p.title}
                      image={
                        (p.images && p.images[0]) || p.image || "/images/image.jpg"
                      }
                      price={p.price}
                      discount={p.discount || 0}
                      rating={p.rating?.average ?? p.rating ?? 4.5}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="section-container py-20 text-center text-gray-500">
          Loading products…
        </div>
      }
    >
      <ProductsInner />
    </Suspense>
  );
}
