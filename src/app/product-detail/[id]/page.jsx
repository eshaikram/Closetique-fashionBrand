"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  Truck,
  Lock,
  ShieldCheck,
} from "lucide-react";
import ProductReview from "@/components/ProductReview";
import { useCart } from "@/lib/CartContext";
import products from "@/data/AllProducts";

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();

  // Debug the incoming ID
  console.log("Params ID:", id);

  // Ensure id is a string for comparison
  const product = products.find((p) => p.id === String(id));

  // Debug the found product
  console.log("Found product:", product);

  const { addToCart } = useCart();

  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedCondition, setSelectedCondition] = useState("Brand new");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");

  // Handle case where product is not found
  if (!product) {
    return <div className="p-6 text-center text-gray-600">Product not found (ID: {id})</div>;
  }

  const thumbnailImages = Array(5).fill(product.image);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? thumbnailImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === thumbnailImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity,
        color: selectedColor,
      });
      console.log("Added to cart:", { id: product.id, title: product.title, quantity });
      // Optionally redirect to cart page
      // router.push("/Cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Calculate discounted price
  const discountedPrice = product.discount > 0 
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT: Big image + thumbnails */}
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={thumbnailImages[currentImageIndex]}
              alt={product.title}
              className="w-full h-[450px] object-cover transition-transform duration-300 hover:scale-105"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-700 p-2 rounded-full shadow hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-700 p-2 rounded-full shadow hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex gap-3 mt-4">
            {thumbnailImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-20 h-20 object-cover rounded-xl border cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  currentImageIndex === i
                    ? "border-primary border-2 shadow"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* MIDDLE: Product details */}
        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {product.title}
          </h1>
          <div className="flex items-center gap-2 text-sm">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < Math.round(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 font-medium">{product.rating}</span>
            <span className="text-gray-400">· 32 reviews</span>
            <span className="text-gray-400">· 154 orders</span>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <p
            className={`font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} left)`
              : "Out of Stock"}
          </p>
          <div>
            <h4 className="text-sm font-semibold mb-2">Condition</h4>
            <div className="flex gap-2">
              {["Brand new", "Used", "Refurbished"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCondition(c)}
                  className={`px-3 py-1 rounded-lg border text-sm transition ${
                    selectedCondition === c
                      ? "border-primary text-primary bg-primary/10"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Color</h4>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-9 h-9 rounded-full border-2 transition ${
                    selectedColor === c
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <ul className="text-sm text-gray-700 space-y-1 mt-5">
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key}>
                <span className="font-medium">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Add to Cart box */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border space-y-5 sticky top-6">
          <div>
            <p className="text-3xl font-bold text-primary">
              ${discountedPrice}
            </p>
            {product.discount > 0 && (
              <p className="text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
            <p className="text-sm text-gray-500">Price per kg · Includes VAT</p>
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 w-44">
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="text-lg font-bold text-gray-600 hover:text-primary"
            >
              −
            </button>
            <span className="mx-4 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="text-lg font-bold text-gray-600 hover:text-primary"
            >
              +
            </button>
            <span className="ml-2 text-gray-600">Kg.</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 rounded-lg shadow-md transition ${
              product.stock === 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            Add to cart
          </button>
          <button
            className="w-full bg-primary/10 text-primary py-3 rounded-lg hover:bg-primary/20 transition"
          >
            Buy now
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center justify-center gap-2 text-primary hover:text-opacity-80 w-full font-medium"
          >
            <Heart
              size={18}
              className={`${isFavorite ? "fill-current" : ""}`}
            />
            Add to wishlist
          </button>
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <Truck size={16} /> Worldwide shipping
            </p>
            <p className="flex items-center gap-2">
              <Lock size={16} /> Secure payment
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={16} /> 2 years full warranty
            </p>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="mt-14">
        <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex gap-4 sm:gap-8 border-b overflow-x-auto no-scrollbar">
            {["specs", "shipping", "reviews", "seller"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 sm:pb-3 text-sm font-semibold whitespace-nowrap transition ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {tab === "specs"
                  ? "Specifications"
                  : tab === "shipping"
                  ? "Shipping Info"
                  : tab === "reviews"
                  ? "Reviews"
                  : "Seller Profile"}
              </button>
            ))}
          </div>
          <div className="mt-4 sm:mt-6 text-sm text-gray-700 leading-relaxed">
            {activeTab === "specs" && (
              <ul className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex justify-between border-b pb-2 last:border-0 text-xs sm:text-sm"
                  >
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "shipping" && (
              <p className="text-gray-600">
                🚚 Shipping information goes here...
              </p>
            )}
            {activeTab === "reviews" && (
              <ProductReview productId={product.id} />
            )}
            {activeTab === "seller" && (
              <p className="text-gray-600">🏪 Seller details here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}