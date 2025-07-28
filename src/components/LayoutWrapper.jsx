'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar/Navbar';
import Footer from './footer/footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide layout on login, register, and any admin route
  const hideLayout =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/admin');

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
