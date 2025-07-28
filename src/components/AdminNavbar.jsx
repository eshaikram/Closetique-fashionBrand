'use client';

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import ProfileDropdown from "./navbar/ProfileDropdown";
import { usePathname } from "next/navigation";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/user": "Users",
  "/admin/products": "Products",
  "/admin/orders": "Orders",
  "/admin/settings": "Settings",
};

export default function AdminNavbar() {
  return <NavbarContent />;
}

function NavbarContent() {
  const pathname = usePathname();
  const pageName = pageTitles[pathname] || "Admin Panel";
  const { open } = useSidebar();

  return (
    <div
      className={`h-16 flex items-center justify-between px-6 bg-gray-100 shadow-sm transition-all duration-300 md:${
        open ? 'ml-64' : 'ml-0'
      }`}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold text-black">{pageName}</h1>
      </div>
      <ProfileDropdown />
    </div>
  );
}