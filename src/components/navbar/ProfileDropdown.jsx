'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircleUserRound, User, Settings, LogOut, LogIn } from 'lucide-react';

export default function ProfileDropdown({ icon }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Fetch actual user info from API
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching user in dropdown:', err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
      setOpen(false);
      router.push('/login');
    }
  };

  const initials = user?.user_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={dropdownRef}>

<button
  onClick={() => setOpen((prev) => !prev)}
  aria-label="Account"
  className="
    p-3 rounded-full 
    border-transparent 
    lg:border lg:border-gray-200 
    lg:hover:border-orange-500 
    lg:hover:bg-orange-100 
    transition-all duration-300 transform 
    hover:scale-110 
    cursor-pointer
  "
>

  {icon || <CircleUserRound className="w-7 h-7 text-orange-600" />}
</button>
 

      {!loading && open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {user ? (
            <>
              <div className="flex items-center space-x-4 px-4 py-3 border-b border-gray-200">
                <div className="bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  {initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{user.user_name}</span>
                  <span className="text-xs text-gray-500">{user.user_email}</span>
                </div>
              </div>
              <DropdownItem
                icon={<User size={16} />}
                label="View Profile"
                onClick={() => {
                  setOpen(false);
                  router.push('/profile');
                }}
              />
              <DropdownItem
                icon={<Settings size={16} />}
                label="Account Settings"
                onClick={() => {
                  setOpen(false);
                  router.push('/settings');
                }}
              />
              <DropdownItem icon={<LogOut size={16} />} label="Sign out" onClick={handleLogout} />
            </>
          ) : (
            <div className="px-4 py-3 space-y-2">
              <button
                onClick={() => {
                  setOpen(false);
                  router.push('/login');
                }}
                className="w-full flex items-center justify-center space-x-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-md py-2"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push('/signup');
                }}
                className="w-full flex items-center justify-center space-x-2 text-sm text-orange-500 border border-orange-500 hover:bg-orange-50 rounded-md py-2"
              >
                <User size={16} />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
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