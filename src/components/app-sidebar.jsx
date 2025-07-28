'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import LogoAdmin from './Icons/logoAdmin';
import { useState } from 'react';

const items = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: Home },
  { title: 'Users', url: '/admin/user', icon: Inbox },
  {
    title: 'Products',
    url: null, // No direct navigation
    icon: Calendar,
    subItems: [
      { title: 'Product List', url: '/admin/products' }, // Products page
      { title: 'Product Card', url: '/admin/products/card' },
      { title: 'Product Details', url: '/admin/products/details' },
    ],
  },
  { title: 'Orders', url: '/admin/orders', icon: Search },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
  { title: 'Inventory', url: '/admin/inventory', icon: Settings },
  { title: 'Sales Reports', url: '/admin/sales-reports', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState({});

  const toggleOpen = (title) => {
    setIsOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Sidebar className="!bg-gradient-to-b from-orange-600 to-orange-400 text-white min-h-screen rounded-r-2xl shadow-2xl">
      <SidebarContent className="!bg-gradient-to-b from-orange-600 to-orange-400 p-2">
        <SidebarGroup>
          <div className='mb-8'>
            <Link href="/">
              <LogoAdmin />
            </Link>
          </div>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map((item) => {
                const isActive = item.subItems && item.subItems.some(sub => pathname === sub.url);
                const isExpanded = isOpen[item.title] || false;

                return (
                  <div key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        onClick={() => item.subItems && toggleOpen(item.title)}
                        className={item.url ? '' : 'cursor-pointer'} // Non-navigable cursor
                      >
                        <div
                          className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
                            ${
                              isActive
                                ? 'bg-white/90 text-orange-700 shadow-md'
                                : 'text-white hover:bg-white/20 hover:shadow-lg'
                            }`}
                        >
                          <item.icon
                            className={`w-6 h-6 ${
                              isActive ? 'text-orange-700' : 'text-white'
                            }`}
                          />
                          <span className="font-semibold text-lg flex-1">{item.title}</span>
                          {item.subItems && (
                            <span>{isExpanded ? '▼' : '▶'}</span>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    {item.subItems && isExpanded && (
                      <div className="ml-8 space-y-2 mt-2">
                        {item.subItems.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link
                                href={subItem.url}
                                className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
                                  ${
                                    pathname === subItem.url
                                      ? 'bg-white/90 text-orange-700 shadow-md'
                                      : 'text-white hover:bg-white/20 hover:shadow-lg'
                                  }`}
                              >
                                <span className="font-semibold text-md">{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}