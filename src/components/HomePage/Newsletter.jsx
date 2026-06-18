"use client";
import React, { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    // Simulate subscribe request (wire to a real endpoint when available).
    setTimeout(() => {
      setStatus("success");
      setMessage("You're in! Check your inbox for 10% off your first order.");
      setEmail("");
    }, 900);
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 px-6 py-12 sm:px-12 sm:py-16 text-center">
          <div className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 w-72 h-72 bg-white/10 rounded-full" />

          <div className="relative max-w-xl mx-auto">
            <span className="grid place-items-center w-14 h-14 mx-auto rounded-2xl bg-white/20 text-white mb-5">
              <Mail className="w-7 h-7" />
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Join the Closetique Club
            </h2>
            <p className="mt-3 text-white/90 text-sm sm:text-base">
              Subscribe for exclusive offers, early access to new drops, and{" "}
              <span className="font-semibold">10% off</span> your first order.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="flex-1 rounded-full px-5 py-3.5 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-white/60 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white font-semibold px-7 py-3.5 hover:bg-gray-800 transition-colors disabled:opacity-70"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === "success" ? (
                  <Check className="w-5 h-5" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {message && (
              <p
                className={`mt-4 text-sm font-medium ${
                  status === "error" ? "text-red-100" : "text-white"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
