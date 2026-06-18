"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

function SuccessInner() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white border border-orange-200 rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Order placed!</h1>
        <p className="mt-2 text-sm text-gray-600">
          Thanks for shopping with us. We've emailed you a receipt.
        </p>
        {orderId && (
          <p className="mt-4 text-xs text-gray-500">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>
        )}
        <Link
          href="/"
          className="mt-6 inline-block bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center text-gray-500">
          Loading…
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
