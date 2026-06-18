"use client";
import React from "react";
import { Star, Quote } from "lucide-react";
import SectionHeader from "./SectionHeader";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Verified Buyer",
    rating: 5,
    text: "Absolutely in love with the quality! The fabric feels premium and the fit is perfect. Closetique has become my go-to store for everything.",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "James Carter",
    role: "Verified Buyer",
    rating: 5,
    text: "Fast shipping and the packaging was beautiful. The blazer I ordered exceeded my expectations. Will definitely shop again!",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Aisha Khan",
    role: "Verified Buyer",
    rating: 4,
    text: "Great selection of styles and the customer service was incredibly helpful with my exchange. Highly recommend to anyone who loves fashion.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

export default function Testimonials() {
  return (
    <section className="py-8 sm:py-12">
      <div className="section-container">
        <SectionHeader
          eyebrow="Loved by thousands"
          title="What Our Customers Say"
          subtitle="Real reviews from real shoppers around the world."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-orange-100" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "text-orange-400 fill-orange-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                “{t.text}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-orange-100"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-green-600 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
