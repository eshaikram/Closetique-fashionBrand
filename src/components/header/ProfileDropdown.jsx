"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, LogIn, Package, Star, Gift, CreditCard, Store, History, MapPin, Shield, Bell } from "lucide-react";

export default function ProfileDropdown({ icon, setIsMobileMenuOpen }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user in dropdown:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      setOpen(false);
      router.push("/login");
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const initials = user?.user_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Account"
        className="cursor-pointer"
      >
        {icon}
      </button>

      {!loading && open && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setOpen(false)}
          ></div>
          <div
            className="absolute mt-2 !w-65 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            style={{ left: "50%", transform: "translateX(-50%)", zIndex: 50 }}
          >
            {user ? (
              <>
                <div className="flex items-center w-60 space-x-4 px-4 py-3 border-b border-gray-200">
                  <div className="bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{user.user_name}</span>
                    <span className="text-xs text-gray-500">{user.user_email}</span>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  <DropdownItem icon={<Package size={20} />} label="Your orders" />
                  <DropdownItem icon={<Star size={20} />} label="Your reviews" />
                  <DropdownItem icon={<User size={20} />} label="Your profile" />
                  <DropdownItem icon={<Gift size={20} />} label="Coupons & offers" />
                  <DropdownItem icon={<CreditCard size={20} />} label="Credit balance" />
                  <DropdownItem icon={<Store size={20} />} label="Followed stores" />
                  <DropdownItem icon={<History size={20} />} label="Browsing history" />
                  <DropdownItem icon={<MapPin size={20} />} label="Addresses" />
                  <DropdownItem icon={<Shield size={20} />} label="Account security" />
                  <DropdownItem icon={<Bell size={20} />} label="Notifications" />
                </div>

                <div className="border-t border-gray-200">
                  <DropdownItem
                    icon={<Settings size={20} />}
                    label="Account Settings"
                    onClick={() => {
                      setOpen(false);
                      router.push("/settings");
                    }}
                  />
                  <DropdownItem
                    icon={<LogOut size={20} />}
                    label="Sign out"
                    onClick={handleLogout}
                  />
                </div>
              </>
            ) : (
              <div className="px-4 py-3 space-y-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push("/login");
                  }}
                  className="w-full flex items-center justify-center space-x-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-md py-2"
                >
                  <LogIn size={20} />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push("/signup");
                  }}
                  className="w-full flex items-center justify-center space-x-2 text-sm text-orange-500 border border-orange-500 hover:bg-orange-50 rounded-md py-2"
                >
                  <User size={20} />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function DropdownItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-100 space-x-2"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}