"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Counts down to a deadline ~3 days from first client render.
function useCountdown(durationMs = 3 * 24 * 60 * 60 * 1000) {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const deadline = Date.now() + durationMs;
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationMs]);

  if (remaining == null) return null;
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="grid place-items-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm text-2xl sm:text-3xl font-bold text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-white/70">
        {label}
      </span>
    </div>
  );
}

export default function PromoBanner() {
  const t = useCountdown();

  return (
    <section className="py-8 sm:py-12">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl">
          {/* background */}
          <img
            src="/images/banner3.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/30" />

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:py-20 max-w-2xl">
            <span className="inline-block rounded-full bg-orange-500 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5">
              Mega Sale Event
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Up to <span className="text-orange-400">50% Off</span>
              <br />
              the Summer Collection
            </h2>
            <p className="mt-4 text-white/80 text-sm sm:text-base max-w-md">
              Refresh your wardrobe with our biggest sale of the season. Hurry,
              the offer ends soon!
            </p>

            {/* countdown */}
            <div className="mt-8 flex items-center gap-3 sm:gap-4">
              {t ? (
                <>
                  <TimeBox value={t.days} label="Days" />
                  <span className="text-2xl font-bold text-white/50 -mt-5">:</span>
                  <TimeBox value={t.hours} label="Hours" />
                  <span className="text-2xl font-bold text-white/50 -mt-5">:</span>
                  <TimeBox value={t.minutes} label="Mins" />
                  <span className="text-2xl font-bold text-white/50 -mt-5">:</span>
                  <TimeBox value={t.seconds} label="Secs" />
                </>
              ) : (
                <div className="h-16" />
              )}
            </div>

            <Link
              href="/products"
              className="mt-8 group inline-flex items-center gap-2 rounded-full bg-white text-gray-900 font-semibold px-8 py-3.5 hover:bg-orange-500 hover:text-white transition-colors"
            >
              Shop the Sale
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
