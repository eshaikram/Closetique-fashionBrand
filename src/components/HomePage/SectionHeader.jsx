"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Reusable section header used across the homepage product sections.
 * Provides a consistent eyebrow + title + subtitle layout with an optional
 * "view all" link.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel = "View All",
  accent = "orange",
}) {
  const accentText = {
    orange: "text-orange-600 hover:text-orange-700",
    blue: "text-blue-600 hover:text-blue-700",
    red: "text-red-600 hover:text-red-700",
    purple: "text-purple-600 hover:text-purple-700",
  }[accent];

  const accentEyebrow = {
    orange: "text-orange-500",
    blue: "text-blue-500",
    red: "text-red-500",
    purple: "text-purple-500",
  }[accent];

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7 sm:mb-10">
      <div>
        {eyebrow && (
          <span
            className={`inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2 ${accentEyebrow}`}
          >
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className={`group inline-flex items-center gap-2 font-semibold text-sm sm:text-base whitespace-nowrap transition-colors ${accentText}`}
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
