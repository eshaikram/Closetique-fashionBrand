"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
} from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";

const shopLinks = [
  { label: "New Arrivals", href: "/products" },
  { label: "Best Sellers", href: "/products" },
  { label: "Sale", href: "/products" },
  { label: "Women", href: "/products" },
  { label: "Men", href: "/products" },
];

const helpLinks = [
  { label: "Track Your Order", href: "/orders" },
  { label: "Shipping & Returns", href: "#" },
  { label: "Size Guide", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact Us", href: "#" },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Our Story", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaPinterestP, href: "#", label: "Pinterest" },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-serif font-semibold text-white"
            >
              Closet<span className="text-orange-500">ique</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs leading-relaxed">
              Where fashion meets craftsmanship. Premium clothing designed to be
              worn and loved — delivered to your door.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                123 Fashion Avenue, Style City
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                +(2) 871 382 023
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                support@closetique.com
              </li>
            </ul>
          </div>

          <LinkColumn title="Shop" links={shopLinks} />
          <LinkColumn title="Help" links={helpLinks} />
          <LinkColumn title="Company" links={companyLinks} />

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid place-items-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Closetique. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-3xl text-gray-500">
            <FaCcVisa className="hover:text-white transition-colors" />
            <FaCcMastercard className="hover:text-white transition-colors" />
            <FaCcPaypal className="hover:text-white transition-colors" />
            <FaCcApplePay className="hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
