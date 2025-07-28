'use client';

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/app-sidebar';
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider key="sidebar-provider">
      <div className="flex min-h-screen w-full">
        <div className="hidden md:block w-64 fixed left-0 top-0 bottom-0 z-40">
          <AppSidebar />
        </div>
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}

function MainContent({ children }) {
  const { open, isMobile } = useSidebar(); // Added isMobile for debugging
  console.log('MainContent - Sidebar State:', { open, isMobile }); // Debug log
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <AdminNavbar />
      <main
        className={`flex-1 p-4 bg-gray-100 transition-all duration-300 ${
          isMobile ? '' : (open ? 'md:ml-64' : 'md:ml-0')
        }`}
      >
        {children}
      </main>
    </div>
  );
}