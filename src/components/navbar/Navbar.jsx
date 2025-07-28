'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CircleUserRound, ShoppingCart, MessageCircle, PackageSearch, Menu, Search } from 'lucide-react';
import DesktopNavLinks from './DesktopNavLinks';
import MobileNavLinks from './MobileNavLinks';
import NavIcon from './NavIcon';
import SearchInput from './SearchInput';
import ProfileDropdown from './ProfileDropdown';
import Logo from '../Icons/logo';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
    setSearchOpen(false);
  };

  const toggleCategories = () => setCategoriesOpen(prev => !prev);
  const toggleSearch = () => setSearchOpen(prev => !prev);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Search query:', query);
      setQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <div className="relative">
      <nav className="bg-gradient-to-r from-black to-gray-900 shadow-lg py-3 sticky top-0 z-50 text-white w-full">
        <div className="w-full flex justify-between items-center px-6">
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Ensure logo is always visible */}
            <Link href="/" className="flex items-center h-full pr-4 max-w-[220px] w-full md:w-auto flex-shrink-0">
              <Logo />
            </Link>
            {/* Mobile icons */}
            <div className="flex items-center space-x-4 md:hidden">
              <button onClick={toggleSearch} className="hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-gray-300 hover:text-orange-500" />
              </button>
              <Link href="/orders">
                <PackageSearch className="w-7 h-7 text-gray-300 hover:text-orange-500" />
              </Link>
              <Link href="/support">
                <MessageCircle className="w-7 h-7 text-gray-300 hover:text-orange-500" />
              </Link>
              <Link href="/cart">
                <ShoppingCart className="w-7 h-7 text-gray-300 hover:text-orange-500" />
              </Link>
              <NavIcon href="/profile" label="Profile" Icon={CircleUserRound} />
              <button onClick={toggleMobileMenu} className="hover:scale-110 transition-transform">
                <Menu className="w-7 h-7 text-gray-300 hover:text-orange-500" />
              </button>
            </div>
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:flex justify-between items-center w-full px-6">
            <DesktopNavLinks />
            <div className="flex items-center space-x-6">
              <SearchInput query={query} setQuery={setQuery} onSubmit={handleSearch} />
              <NavIcon href="/orders" label="Orders" Icon={PackageSearch} />
              <NavIcon href="/support" label="Support" Icon={MessageCircle} />
              <NavIcon href="/cart" label="Cart" Icon={ShoppingCart} />
              <ProfileDropdown icon={<CircleUserRound className="w-7 h-7 text-gray-300" />} />
            </div>
          </div>
        </div>
        {isSearchOpen && (
          <form
            onSubmit={handleSearch}
            className="md:hidden flex items-center w-full px-6 py-3 mt-2 border-t border-gray-700"
          >
            <input
              type="text"
              placeholder="Search clothing..."
              className="flex-1 p-3 outline-none text-sm border rounded-full text-gray-700 placeholder-gray-500 bg-white focus:ring-2 focus:ring-orange-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-orange-500 text-white p-3 ml-2 rounded-full hover:bg-orange-600 transition-colors">
              <Search size={20} />
            </button>
          </form>
        )}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 bg-opacity-95 shadow-lg transition-all duration-300">
            <MobileNavLinks
              toggleMobileMenu={toggleMobileMenu}
              isCategoriesOpen={isCategoriesOpen}
              toggleCategories={toggleCategories}
            />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;