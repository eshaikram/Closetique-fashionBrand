'use client';
import { useEffect, useState } from 'react';
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaTruck,
  FaBars,
  FaTimes,
  FaHome,
} from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import LogoAdmin from '../Icons/logoAdmin';
import ProfileDropdown from './ProfileDropdown';
import Logo from '../Icons/logo';

const NavbarUser = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileMenuOpen(false); // Close mobile menu if search is opened
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Search query:', query);
      setQuery('');
      setIsSearchOpen(false);
    }
  };

  const SidebarItem = ({ icon, text }) => (
    <div className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </div>
  );

  return (
    <div className="w-full font-sans text-sm">
      {/* Top Bar */}
      <div className="bg-primary text-white flex flex-wrap justify-between px-4 md:px-6 py-2 text-xs items-center">
        <div className="flex-1">
          <span className="font-semibold">Until the end of the sale: </span>
          <span className="font-bold">830</span> Days
          <span className="font-bold"> 18</span> Hours
          <span className="font-bold"> 55</span> Minutes
          <span className="font-bold"> 3</span> Sec.
        </div>
        <div className="hidden lg:flex items-center gap-4 flex-wrap">
          <div className="hidden md:flex">
            Buy one get one free on{' '}
            <span className="text-yellow-300 font-medium ml-1">first order</span>
          </div>
          <div className="flex items-center gap-1">
            <FaTruck />
            <span>Track Your Order</span>
          </div>
          <span className="cursor-pointer">Order Tracking</span>
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
        <div className="flex items-center gap-2 text-xl font-bold text-green-600">
          <LogoAdmin />
        </div>
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <select className="border border-gray-300 px-3 py-2 rounded-l-md text-gray-600 bg-white">
            <option>All categories</option>
          </select>
          <input
            type="text"
            placeholder="Search for products, categories or brands..."
            className="flex-1 border-t border-b border-gray-300 px-3 py-2 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-4 py-2 rounded-r-md"
          >
            <FaSearch />
          </button>
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
          <div className="relative flex items-center cursor-pointer">
            <div className="hidden md:flex items-center gap-1">
              <FaHeart className="w-5 h-5" />
              <span>Wishlist</span>
            </div>
            <div className="md:hidden">
              <FaHeart className="w-5 h-5" />
            </div>
            <span className="text-white bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center absolute -top-2 -right-3">
              2
            </span>
          </div>
          <div className="relative flex items-center cursor-pointer">
            <div className="hidden md:flex items-center gap-1">
              <FaShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </div>
            <div className="md:hidden">
              <FaShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-white bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center absolute -top-2 -right-3">
              2
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search Form */}
      {isSearchOpen && (
        <form
          onSubmit={handleSearch}
          className="md:hidden flex items-center w-full px-4 py-3 border-t border-gray-300 bg-white"
        >
          <input
            type="text"
            placeholder="Search for products, categories or brands..."
            className="flex-1 p-3 outline-none text-sm border rounded-full text-gray-700 placeholder-gray-500 bg-white focus:ring-2 focus:ring-primary"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white p-3 ml-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            <FaSearch size={20} />
          </button>
        </form>
      )}

      {/* Bottom Nav Bar (Desktop) */}
      <div className="bg-white shadow-md px-4 md:px-6 py-3 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2">
            <span className="text-lg">▦</span>
            Browse Categories
            <MdKeyboardArrowDown />
          </button>
          <span className="cursor-pointer">
            Home <MdKeyboardArrowDown className="inline" />
          </span>
          <span className="cursor-pointer relative">
            Shop <MdKeyboardArrowDown className="inline" />
            <span className="absolute top-[-12px] -right-6 text-[10px] bg-orange-200 text-orange-800 px-2 rounded-full">
              New
            </span>
          </span>
          <span className="cursor-pointer relative">
            Pages <MdKeyboardArrowDown className="inline" />
            <span className="absolute top-[-12px] -right-6 text-[10px] bg-orange-200 text-orange-800 px-2 rounded-full">
              New
            </span>
          </span>
          <span className="cursor-pointer relative">
            Vendors <MdKeyboardArrowDown className="inline" />
            <span className="absolute top-[-12px] -right-6 text-[10px] bg-purple-200 text-purple-800 px-2 rounded-full">
              New
            </span>
          </span>
          <span className="cursor-pointer">
            Blog <MdKeyboardArrowDown className="inline" />
          </span>
          <span className="cursor-pointer">Contact Us</span>
        </div>
        <div className="text-right text-sm">
          <div className="text-gray-500">Need any Help! call Us</div>
          <div className="text-primary font-semibold">+(2) 871 382 023</div>
        </div>
      </div>

      {/* Bottom Nav Bar (Mobile) */}
      <div className="bg-white shadow-md px-4 py-3 flex items-center justify-between md:hidden w-full z-10">
        <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2">
          <span className="text-lg">▦</span>
          Browse Collection
        </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
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
          <div
            className="fixed top-0 left-0 w-64 h-full bg-white z-20 px-6 py-6 shadow-lg transition-transform duration-300 ease-in-out transform translate-x-0"
          >
            <button
              className="absolute top-4 right-4 text-primary hover:text-primary border rounded-full p-1 bg-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="mb-8 font-bold">
              <LogoAdmin />
            </div>
            <nav className="space-y-5 text-gray-800 font-medium">
              <SidebarItem icon={<FaHome />} text="Home" />
              <SidebarItem icon={<FaShoppingCart />} text="Shop" />
              <SidebarItem icon={<FaUser />} text="Pages" />
              <SidebarItem icon={<FaTruck />} text="Vendors" />
              <SidebarItem icon={<FaHeart />} text="Blog" />
              <SidebarItem icon={<FaSearch />} text="Contact Us" />
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarUser;