"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, Truck, Lock, ChevronLeft } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

const SHIPPING_FEE = 5;
const TAX_RATE = 0.05;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/cart");
        if (res.data.success) setItems(res.data.cart);
      } catch (err) {
        console.error("Cart load error:", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = +(subtotal * TAX_RATE).toFixed(2);
    const shipping = items.length ? SHIPPING_FEE : 0;
    const total = +(subtotal + tax + shipping).toFixed(2);
    return { subtotal: +subtotal.toFixed(2), tax, shipping, total };
  }, [items]);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone)) e.phone = "Invalid phone";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.postalCode.trim()) e.postalCode = "Required";
    if (!form.country.trim()) e.country = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key) => (ev) =>
    setForm((prev) => ({ ...prev, [key]: ev.target.value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    if (items.length === 0) {
      setServerError("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axiosInstance.post("/orders", {
        shipping: form,
        paymentMethod,
      });
      if (res.data?.success) {
        router.push(`/checkout/success?orderId=${res.data.orderId}`);
      } else {
        setServerError(res.data?.message || "Could not place order");
      }
    } catch (err) {
      setServerError(err.message || "Could not place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading checkout…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center bg-white border border-orange-200 rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add a product before checking out.</p>
          <Link
            href="/"
            className="inline-block bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/Cart"
        className="inline-flex items-center text-sm text-gray-600 hover:text-orange-600 mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Shipping details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Full name"
                value={form.fullName}
                onChange={handleChange("fullName")}
                error={errors.fullName}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                error={errors.email}
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={handleChange("phone")}
                error={errors.phone}
              />
              <Field
                label="Country"
                value={form.country}
                onChange={handleChange("country")}
                error={errors.country}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  value={form.address}
                  onChange={handleChange("address")}
                  error={errors.address}
                />
              </div>
              <Field
                label="City"
                value={form.city}
                onChange={handleChange("city")}
                error={errors.city}
              />
              <Field
                label="Postal code"
                value={form.postalCode}
                onChange={handleChange("postalCode")}
                error={errors.postalCode}
              />
            </div>
          </section>

          <section className="bg-white border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Payment method</h2>
            </div>
            <div className="space-y-2">
              <PayOption
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={setPaymentMethod}
                title="Cash on delivery"
                description="Pay in cash when your order arrives."
              />
              <PayOption
                value="card"
                checked={paymentMethod === "card"}
                onChange={setPaymentMethod}
                title="Credit / debit card"
                description="Card processing is simulated in this demo."
              />
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-4 bg-white border border-orange-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Order summary</h2>
            <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {items.map((item) => (
                <li
                  key={`${item.id}-${item.color}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-md object-cover border border-orange-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      {item.color ? `${item.color} · ` : ""}Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t pt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
              <Row label="Shipping" value={`$${totals.shipping.toFixed(2)}`} />
              <Row label="Tax" value={`$${totals.tax.toFixed(2)}`} />
              <Row
                label="Total"
                value={`$${totals.total.toFixed(2)}`}
                strong
              />
            </div>

            {serverError && (
              <p className="mt-4 text-sm text-red-600 text-center">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
            >
              {submitting ? "Placing order…" : "Place order"}
            </button>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock className="w-3 h-3" /> Secure checkout
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <input
        {...props}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
          error
            ? "border-red-300 focus:ring-red-300"
            : "border-orange-200 focus:ring-orange-300"
        }`}
      />
      {error && <span className="block mt-1 text-xs text-red-600">{error}</span>}
    </label>
  );
}

function PayOption({ value, checked, onChange, title, description }) {
  return (
    <label
      className={`flex gap-3 items-start p-3 rounded-lg border cursor-pointer transition ${
        checked
          ? "border-orange-400 bg-orange-50"
          : "border-orange-100 hover:border-orange-300"
      }`}
    >
      <input
        type="radio"
        name="payment"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mt-1 accent-orange-500"
      />
      <span>
        <span className="block font-medium text-sm">{title}</span>
        <span className="block text-xs text-gray-500">{description}</span>
      </span>
    </label>
  );
}

function Row({ label, value, strong = false }) {
  return (
    <div
      className={`flex justify-between ${
        strong ? "text-base font-bold text-gray-900 pt-2 border-t" : "text-gray-600"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
