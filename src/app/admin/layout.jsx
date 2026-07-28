'use client';

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/app-sidebar';
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider 
      key="sidebar-provider"
      style={{
        "--sidebar-width": "18rem",
        "--sidebar-width-icon": "70px"
      }}
    >
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}

function LayoutContent({ children }) {
  const { open, isMobile } = useSidebar();
  return (
    <div className="flex min-h-screen w-full">
      <div
        className={`hidden md:block fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ${
          open ? 'w-72' : 'w-[70px]'
        }`}
      >
        <AppSidebar />
      </div>
      <div className="flex flex-col flex-1 min-h-screen">
        <AdminNavbar />
        <main
          className={`flex-1 p-3 bg-gray-100 transition-all duration-300 ${
            isMobile ? '' : (open ? 'md:ml-72' : 'md:ml-[70px]')
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}