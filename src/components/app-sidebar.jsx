'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard,
  Mail,
  Calendar,
  ShoppingBag,
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  User,
  Settings,
  HelpCircle,
  MessageSquareText,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import LogoAdmin from './Icons/logoAdmin';

// Small centered emblem for collapsed state (on a white background circle)
const LogoIcon = () => (
  <div className="bg-white p-1.5 rounded-xl shadow-md inline-flex items-center justify-center w-10 h-10 transform hover:scale-110 transition-transform duration-300">
    <svg width="24" height="24" viewBox="15 5 30 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="emblemGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#FF6A00" />
        </linearGradient>
      </defs>
      <path 
        d="M20 10 H40 V15 H25 V25 H38 V30 H25 V40 H40 V45 H20 Z" 
        fill="url(#emblemGradient)" 
      />
    </svg>
  </div>
);

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const [openSubMenus, setOpenSubMenus] = useState({ Products: true }); // Default products menu open for convenience


  const toggleSubMenu = (title) => {
    setOpenSubMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      window.location.reload();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const sections = [
    {
      title: 'General',
      items: [
        { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
        { title: 'Inbox', url: '#', icon: Mail, badge: 'New', badgeColor: 'bg-white/25 text-white border border-white/30 font-bold' },
        { title: 'Bookings', url: '#', icon: Calendar, badge: 'Soon', badgeColor: 'bg-white/10 text-orange-200 border border-white/10 font-medium' },
      ],
    },
    {
      title: 'Store Management',
      items: [
        {
          title: 'Products',
          url: null, // Collapsible sub-items
          icon: ShoppingBag,
          subItems: [
            { title: 'Product List', url: '/admin/products' },
            { title: 'Product Card', url: '/admin/products/card' },
            { title: 'Product Details', url: '/admin/products/details' },
          ],
        },
        { title: 'Orders', url: '/admin/orders', icon: ShoppingCart },
        { title: 'Inventory', url: '/admin/stock', icon: Package },
        { title: 'Users', url: '/admin/user', icon: Users },
      ],
    },
    {
      title: 'Finance & Analytics',
      items: [
        { title: 'Sales Reports', url: '#', icon: TrendingUp },
      ],
    },
    {
      title: 'Account',
      items: [
        { title: 'Profile', url: '/admin/profile', icon: User },
        { title: 'Settings', url: '/admin/settings', icon: Settings },
      ],
    },
    {
      title: 'Support',
      items: [
        { title: 'Help', url: '#', icon: HelpCircle },
      ],
    },
  ];

  return (
    <Sidebar className="!bg-gradient-to-b from-orange-600 to-orange-400 border-none text-white min-h-screen flex flex-col justify-between rounded-r-2xl shadow-2xl" collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader className="!bg-transparent px-5 py-4 border-b border-white/15 flex items-center justify-between min-h-16">
        {open ? (
          <Link href="/" className="flex items-center gap-2 overflow-hidden transition-all duration-300">
            <LogoAdmin />
          </Link>
        ) : (
          <div className="w-full flex justify-center py-1 transition-all duration-300">
            <Link href="/">
              <LogoIcon />
            </Link>
          </div>
        )}
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="!bg-transparent px-3 py-4 space-y-4 overflow-y-auto scrollbar-thin">
        {sections.map((section) => (
          <SidebarGroup key={section.title} className="p-0">
            {open && (
              <SidebarGroupLabel className="text-xs font-extrabold text-orange-100 tracking-wider uppercase mb-1 px-3 mt-4">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1.5">
                {section.items.map((item) => {
                  const isCollapsible = !!item.subItems;
                  const isExpanded = openSubMenus[item.title];
                  const hasActiveSub = isCollapsible && item.subItems.some((sub) => pathname === sub.url);
                  const isDirectActive = pathname === item.url;
                  const isActive = isDirectActive || hasActiveSub;

                  return (
                    <div key={item.title}>
                      <SidebarMenuItem>
                        {item.url ? (
                          <SidebarMenuButton asChild tooltip={item.title}>
                            <Link
                              href={item.url}
                              className={`flex items-center w-full px-4 py-4 rounded-xl transition-all duration-200 group relative
                                ${
                                  isDirectActive
                                    ? 'bg-white text-orange-600 font-bold shadow-md'
                                    : 'text-orange-100 font-semibold hover:bg-white/10 hover:text-white'
                                }`}
                            >
                              <item.icon
                                className={`w-6 h-6 transition-transform duration-200 group-hover:scale-110 shrink-0 ${
                                  isDirectActive ? 'text-orange-600' : 'text-orange-100 group-hover:text-white'
                                }`}
                              />
                              {open && (
                                <>
                                  <span className="ml-3 text-[17px] flex-1 truncate font-bold">{item.title}</span>
                                  {item.badge && (
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${item.badgeColor}`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        ) : (
                          <SidebarMenuButton
                            onClick={() => toggleSubMenu(item.title)}
                            tooltip={item.title}
                            className={`flex items-center w-full px-4 py-4 rounded-xl transition-all duration-200 group
                              ${
                                isActive
                                  ? 'bg-white/15 text-white font-bold'
                                  : 'text-orange-100 font-semibold hover:bg-white/10 hover:text-white'
                              }`}
                          >
                            <item.icon
                              className={`w-6 h-6 transition-transform duration-200 group-hover:scale-110 shrink-0 ${
                                isActive ? 'text-white' : 'text-orange-100 group-hover:text-white'
                              }`}
                            />
                            {open && (
                              <>
                                <span className="ml-3 text-[17px] flex-1 text-left truncate font-bold">{item.title}</span>
                                <span className="text-white/60 shrink-0">
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                                  )}
                                </span>
                              </>
                            )}
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>

                      {/* Collapsible Sub Items */}
                      {isCollapsible && isExpanded && open && (
                        <div className="pl-6 mt-1.5 space-y-1 border-l border-white/15 ml-5 transition-all duration-300">
                          {item.subItems.map((subItem) => {
                            const isSubActive = pathname === subItem.url;
                            return (
                              <SidebarMenuItem key={subItem.title}>
                                <SidebarMenuButton asChild>
                                  <Link
                                    href={subItem.url}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 font-semibold
                                      ${
                                        isSubActive
                                          ? 'bg-white text-orange-600 font-bold shadow-sm'
                                          : 'text-white hover:bg-white/10 hover:text-white'
                                      }`}
                                  >
                                    <span className="truncate text-[15px] font-bold">{subItem.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator className="bg-white/15" />

      {/* Sidebar Footer */}
      <SidebarFooter className="!bg-transparent p-4 space-y-3">


        {/* Feedback Button */}
        <SidebarMenuButton asChild tooltip="Feedback">
          <Link
            href="#"
            className={`flex items-center w-full px-3.5 py-3 rounded-xl transition-all duration-200 group text-orange-100 font-semibold hover:bg-white/10 hover:text-white`}
          >
            <MessageSquareText className="w-5 h-5 text-orange-100 transition-transform duration-200 group-hover:scale-110 shrink-0 group-hover:text-white" />
            {open && <span className="ml-3 text-sm font-medium">Feedback</span>}
          </Link>
        </SidebarMenuButton>

        {/* Logout Button */}
        <SidebarMenuButton
          onClick={handleLogout}
          tooltip="Logout"
          className="flex items-center w-full px-3.5 py-3 rounded-xl transition-all duration-200 group text-orange-100 font-semibold hover:bg-red-500/20 hover:text-white cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-orange-100 group-hover:text-red-200 transition-transform duration-200 group-hover:scale-110 shrink-0" />
          {open && <span className="ml-3 text-sm font-medium">Logout</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
