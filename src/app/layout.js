// app/layout.jsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LayoutWrapper from "@/components/LayoutWrapper";
import { CartProvider } from "@/lib/CartContext";
import { WishlistProvider } from "@/lib/WishlistContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Closetique",
  description: "Online Clothing Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <WishlistProvider> {/* Add WishlistProvider */}
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}