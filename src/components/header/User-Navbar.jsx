'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaTruck,
  FaBars,
  FaTimes,
  FaHome,
  FaThLarge,
  FaRegClock,
  FaFire,
} from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import LogoAdmin from '../Icons/logoAdmin';
import ProfileDropdown from './ProfileDropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import { CATEGORIES, toSlug } from '@/lib/categories';

const POPULAR_SEARCHES = [
  'Summer Dresses',
  'Men Shirts',
  'Lawn Collection',
  'Kids Wear',
  'Accessories',
];

// Daraz-style suggestions panel: category matches, recent searches, popular.
function SearchPanel({ query, history, onPick, onRemove, onClear, floating = true }) {
  const q = query.trim().toLowerCase();
  const matches = q
    ? CATEGORIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 4)
    : [];

  return (
    <div
      className={
        floating
          ? 'absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-[70vh] overflow-y-auto'
          : 'mt-2 bg-white rounded-xl border border-gray-100 py-2 max-h-[60vh] overflow-y-auto'
      }
    >
      {/* exact-query row */}
      {q && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onPick(query)}
          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 text-left text-sm"
        >
          <FaSearch className="text-gray-400 shrink-0" />
          <span className="text-gray-700">
            Search for “
            <span className="font-semibold text-gray-900">{query}</span>”
          </span>
        </button>
      )}

      {/* category suggestions */}
      {matches.length > 0 && (
        <div className="py-1 border-t border-gray-100">
          <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Categories
          </p>
          {matches.map((c) => (
            <button
              key={c}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(c, true)}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-orange-50 text-left text-sm text-gray-700"
            >
              <FaThLarge className="text-gray-400 shrink-0" /> {c}
            </button>
          ))}
        </div>
      )}

      {/* recent searches */}
      {history.length > 0 && (
        <div className="py-1 border-t border-gray-100">
          <div className="flex items-center justify-between px-4 py-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Recent Searches
            </p>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={onClear}
              className="text-xs text-orange-600 hover:underline"
            >
              Clear all
            </button>
          </div>
          {history.map((term) => (
            <div
              key={term}
              className="flex items-center justify-between px-4 py-2 hover:bg-orange-50"
            >
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onPick(term)}
                className="flex items-center gap-3 flex-1 text-left text-sm text-gray-700"
              >
                <FaRegClock className="text-gray-400 shrink-0" /> {term}
              </button>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onRemove(term)}
                aria-label={`Remove ${term}`}
                className="text-gray-300 hover:text-red-500 p-1"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* popular */}
      <div className="py-1 border-t border-gray-100">
        <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
          <FaFire className="text-orange-500" /> Popular Searches
        </p>
        <div className="flex flex-wrap gap-2 px-4 py-2">
          {POPULAR_SEARCHES.map((p) => (
            <button
              key={p}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(p)}
              className="text-xs bg-gray-100 hover:bg-orange-100 hover:text-orange-700 text-gray-700 rounded-full px-3 py-1.5 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const NavbarUser = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [history, setHistory] = useState([]);
  const browseRef = useRef(null);
  const searchRef = useRef(null);

  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Load saved search history once on mount.
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      if (Array.isArray(stored)) setHistory(stored);
    } catch {}
  }, []);

  const persistHistory = (next) => {
    setHistory(next);
    try {
      localStorage.setItem('searchHistory', JSON.stringify(next));
    } catch {}
  };

  const saveSearch = (term) => {
    const t = term.trim();
    if (!t) return;
    persistHistory(
      [t, ...history.filter((h) => h.toLowerCase() !== t.toLowerCase())].slice(0, 8)
    );
  };

  const removeSearch = (term) =>
    persistHistory(history.filter((h) => h !== term));

  const clearHistory = () => persistHistory([]);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  // Close the Browse + search dropdowns when clicking outside them.
  useEffect(() => {
    const onClick = (e) => {
      if (browseRef.current && !browseRef.current.contains(e.target)) {
        setIsBrowseOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const goToSearch = (overrideTerm) => {
    const term = (overrideTerm ?? query).trim();
    const params = new URLSearchParams();
    if (term) {
      params.set('search', term);
      saveSearch(term);
    }
    if (category) params.set('category', category);
    router.push(`/products${params.toString() ? `?${params}` : ''}`);
    setQuery('');
    setIsSearchOpen(false);
    setIsSearchFocused(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() || category) goToSearch();
  };

  // Picked from the suggestions panel: a category jumps to its listing,
  // anything else runs as a search term.
  const handlePick = (term, isCategory = false) => {
    if (isCategory) {
      router.push(`/products?category=${toSlug(term)}`);
      setQuery('');
      setIsSearchOpen(false);
      setIsSearchFocused(false);
    } else {
      goToSearch(term);
    }
  };

  const SidebarItem = ({ icon, text, href = '#', onClick }) => (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer hover:text-primary transition"
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </Link>
  );

  return (
    <div className="w-full font-sans text-sm sticky top-0 z-40 bg-white">
      {/* Top Bar */}
      <div className="bg-primary text-white flex flex-wrap justify-between px-4 md:px-6 py-2 text-xs items-center">
        <div className="flex-1">
          <span className="font-semibold">Until the end of the sale: </span>
          <span className="font-bold">830</span> Days
          <span className="font-bold"> 18</span> Hours
          <span className="font-bold"> 55</span> Minutes
          <span className="font-strand"> 3</span> Sec.
        </div>
        <div className="hidden lg:flex items-center gap-4 flex-wrap">
          <div className="hidden md:flex">
            Buy one get one free on{' '}
            <span className="text-yellow-300 font-medium ml-1">first order</span>
          </div>
          <Link href="/orders" className="flex items-center gap-1">
            <FaTruck />
            <span>Track Your Order</span>
          </Link>
          <span className="cursor-pointer">About Us</span>
          <span className="hidden md:flex cursor-pointer">
            Eng <MdKeyboardArrowDown className="inline" />
          </span>
          <span className="hidden md:flex cursor-pointer">
            USD <MdKeyboardArrowDown className="inline" />
          </span>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-green-600">
          <LogoAdmin />
        </Link>
        <div className="hidden md:flex flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-l-md text-gray-600 bg-white max-w-[160px] outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={toSlug(c)}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search for products, categories or brands..."
            className="flex-1 border-t border-b border-gray-300 px-3 py-2 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
          >
            <FaSearch />
          </button>

          {isSearchFocused && (
            <SearchPanel
              query={query}
              history={history}
              onPick={handlePick}
              onRemove={removeSearch}
              onClear={clearHistory}
            />
          )}
        </div>
        <div className="flex items-center gap-4 text-gray-700">
          <button className="block md:hidden" onClick={toggleSearch}>
            <FaSearch className="w-5 h-5" />
          </button>
          <div className="md:hidden">
            <ProfileDropdown
              icon={<FaUser className="w-5 h-5 text-gray-700" />}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
          <div className="hidden md:flex items-center gap-1 cursor-pointer">
            <ProfileDropdown
              icon={<FaUser className="w-5 h-5 text-gray-700" />}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <span>Profile</span>
          </div>

          {/* Wishlist */}
          <Link href="/wishlist">
            <div className="relative flex items-center cursor-pointer">
              <div className="hidden md:flex items-center gap-1">
                <FaHeart className="w-5 h-5" />
                <span>Wishlist</span>
              </div>
              <div className="md:hidden">
                <FaHeart className="w-5 h-5" />
              </div>
              {wishlistCount > 0 && (
                <span className="text-white bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>

          {/* Cart */}
          <Link href="/Cart">
            <div className="relative flex items-center cursor-pointer">
              <div className="hidden md:flex items-center gap-1">
                <FaShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </div>
              <div className="md:hidden">
                <FaShoppingCart className="w-5 h-5" />
              </div>
              {cartCount > 0 && (
                <span className="text-white bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Search Form */}
      {isSearchOpen && (
        <div className="md:hidden w-full px-4 py-3 border-t border-gray-300 bg-white">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products, categories or brands..."
              autoFocus
              className="flex-1 p-3 outline-none text-sm border rounded-full text-gray-700 placeholder-gray-500 bg-white focus:ring-2 focus:ring-primary"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
            >
              <FaSearch size={20} />
            </button>
          </form>
          <SearchPanel
            query={query}
            history={history}
            onPick={handlePick}
            onRemove={removeSearch}
            onClear={clearHistory}
            floating={false}
          />
        </div>
      )}

      {/* Bottom Nav Bar (Desktop) */}
      <div className="bg-white shadow-md px-4 md:px-6 py-3 hidden md:flex items-center justify-between relative">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Browse Categories dropdown */}
          <div className="relative" ref={browseRef}>
            <button
              onClick={() => setIsBrowseOpen((s) => !s)}
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-600 transition-colors"
            >
              <FaThLarge className="text-base" />
              Browse Categories
              <MdKeyboardArrowDown
                className={`transition-transform ${isBrowseOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isBrowseOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c}
                    href={`/products?category=${toSlug(c)}`}
                    onClick={() => setIsBrowseOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors"
                  >
                    {c}
                    <MdKeyboardArrowDown className="-rotate-90 text-gray-400" />
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <Link
                    href="/products"
                    onClick={() => setIsBrowseOpen(false)}
                    className="block px-4 py-2.5 font-semibold text-primary hover:bg-orange-50"
                  >
                    View All Products →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/" className="cursor-pointer hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="cursor-pointer relative hover:text-primary">
            Shop
            <span className="absolute top-[-12px] -right-6 text-[10px] bg-orange-200 text-orange-800 px-2 rounded-full">
              New
            </span>
          </Link>
          <Link href="/products" className="cursor-pointer hover:text-primary">
            Categories
          </Link>
          <Link href="/wishlist" className="cursor-pointer hover:text-primary">
            Wishlist
          </Link>
          <span className="cursor-pointer hover:text-primary">Contact Us</span>
        </div>
        <div className="text-right text-sm">
          <div className="text-gray-500">Need any Help! call Us</div>
          <div className="text-primary font-semibold">+(2) 871 382 023</div>
        </div>
      </div>

      {/* Bottom Nav Bar (Mobile) */}
      <div className="bg-white shadow-md px-4 py-3 flex items-center justify-between md:hidden w-full z-10">
        <Link
          href="/products"
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaThLarge />
          Browse Collection
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'black',
              opacity: 0.5,
              zIndex: 10,
            }}
          ></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-white z-20 px-6 py-6 shadow-lg overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-primary border rounded-full p-1 bg-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="mb-8 font-bold">
              <LogoAdmin />
            </div>
            <nav className="space-y-5 text-gray-800 font-medium">
              <SidebarItem icon={<FaHome />} text="Home" href="/" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem icon={<FaShoppingCart />} text="Shop" href="/products" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem icon={<FaHeart />} text="Wishlist" href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem icon={<FaShoppingCart />} text="Cart" href="/Cart" onClick={() => setIsMobileMenuOpen(false)} />
            </nav>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Categories
              </p>
              <div className="space-y-1">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c}
                    href={`/products?category=${toSlug(c)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-1.5 text-gray-600 hover:text-primary"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarUser;
