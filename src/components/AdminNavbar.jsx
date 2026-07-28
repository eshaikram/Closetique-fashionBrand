'use client';

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import ProfileDropdown from "./header/ProfileDropdown";
import { usePathname } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/user": "Users",
  "/admin/products": "Products",
  "/admin/orders": "Orders",
  "/admin/settings": "Settings",
  "/admin/profile": "Profile",
};

export default function AdminNavbar() {
  return <NavbarContent />;
}

function NavbarContent() {
  const pathname = usePathname();
  const pageName = pageTitles[pathname] || "Admin Panel";
  const { open } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className={`h-16 flex items-center justify-between px-6 bg-gray-100 shadow-sm transition-all duration-300 ${
        open ? 'md:ml-72' : 'md:ml-[70px]'
      }`}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold text-black">{pageName}</h1>
      </div>
      
      <div className="relative">
        <CircleUserRound
          className="w-12 h-12 mt-4 mr-4 text-gray-700 hover:text-orange-500 cursor-pointer transition-colors duration-200 rounded-full p-1 hover:bg-orange-100 hover:ring-2 hover:ring-orange-300"
          onClick={toggleDropdown}
          aria-label="Toggle profile dropdown"
        />
        <ProfileDropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
      </div>
    </div>
  );
}