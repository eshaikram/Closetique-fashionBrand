"use client";
import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On all orders over $50",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "30-day money back",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% protected checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Dedicated assistance",
  },
];

export default function BenefitsBar() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="section-container py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-3 sm:gap-4 group"
            >
              <span className="grid place-items-center shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </span>
              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                  {title}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
