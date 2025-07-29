"use client";
import React, { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { CldUploadButton } from "next-cloudinary";

const AddProductPopup = ({ onClose, onProductAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stuff, setStuff] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [images, setImages] = useState([]); // Store Cloudinary URLs
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate stockQuantity
    if (!stockQuantity || isNaN(stockQuantity) || stockQuantity === "") {
      setSnackbar({
        open: true,
        message: "Please enter a valid stock quantity",
        type: "error",
      });
      return;
    }

    const payload = {
      title,
      description,
      stuff,
      price: Number(price),
      productName,
      category,
      brand,
      countInStock: Number(stockQuantity),
      status,
      images, // Array of Cloudinary URLs
      gender: category.includes("Ladies") ? "women" : "men",
    };

    try {
      const response = await axiosInstance.post("/products", payload);
      setSnackbar({
        open: true,
        message: response.data.message,
        type: "success",
      });
      onProductAdded(response.data.product);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to add product",
        type: "error",
      });
    }
  };

  // Handle Cloudinary upload
 const handleImageUpload = (result) => {
  const publicId = result.info.public_id; // Get public ID instead of full URL
  setImages((prev) => [...prev, publicId]);
};


  const addImageSlot = () => {
    // No need for null slots; images are added via uploads
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-700/80 to-gray-300/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-6xl max-h-[90vh] overflow-y-auto relative text-gray-900 transform transition-all duration-300"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Header */}
        <div className="bg-primary flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-extrabold text-white bg-clip-text">
            Add New Product
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex pb-2 items-center justify-center text-primary bg-white hover:text-gray-800 text-4xl rounded-full hover:bg-orange-100 transition-all cursor-pointer duration-200"
          >
            ×
          </button>
        </div>

        <div className="p-8">
          <div className="flex gap-8">
            {/* Left Section */}
            <div className="w-1/2 space-y-8">
              {/* Base Info */}
              <section>
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                  Base Information
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                    placeholder="Summer Elegance Unstitched Suit"
                    required
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                    placeholder="Premium unstitched suit with intricate embroidery."
                  />
                  <input
                    type="text"
                    value={stuff}
                    onChange={(e) => setStuff(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                    placeholder="Chiffon, Lawn, Cotton, etc."
                  />
                </div>
              </section>

              {/* Images */}
              <section>
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                  Pictures
                </h3>
                <div className="flex gap-4 flex-wrap">
                  <CldUploadButton
                    uploadPreset="my_unsigned_preset" // Replace with your preset
                    onSuccess={handleImageUpload}
                    options={{
                      folder: `${category || "products"}/${brand || "unknown"}`,
                      resource_type: "image",
                    }}
                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-2xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    +
                  </CldUploadButton>
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Details */}
              <section>
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                  Details
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                    placeholder="$120"
                  />
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                    placeholder="Ladies Unstitched 2-Piece"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                  >
                    <option value="">Select Category</option>
                    <option value="Ladies 2-Piece">Ladies 2-Piece</option>
                    <option value="Ladies 3-Piece">Ladies 3-Piece</option>
                    <option value="Ladies Per Meter">Ladies Per Meter</option>
                    <option value="Gents Per Meter">Gents Per Meter</option>
                    <option value="Gents Full Suit">Gents Full Suit</option>
                  </select>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                    placeholder="BrandA, BrandB, etc."
                  />
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                    placeholder="50"
                  />
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all duration-200"
                  >
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </section>
            </div>

            {/* Preview */}
            <div className="w-1/2">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                Preview
              </h3>
              <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 p-6 rounded-xl shadow-lg text-center">
                <div className="relative w-full h-72 bg-gray-100 rounded-lg mb-4 overflow-hidden group">
                  {images[currentImageIndex] ? (
                    <img
                      src={images[currentImageIndex]}
                      alt="Preview"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
                      Preview Image
                    </span>
                  )}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
                      >
                        →
                      </button>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? "bg-orange-500" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {title || "Product Name"}
                </h4>
                <p className="text-orange-500 font-semibold text-lg mb-4">
                  ${price || "Price"}
                </p>
                <div className="text-sm text-gray-600 space-y-2 text-left bg-white/50 p-4 rounded-lg shadow-sm">
                  <p>
                    <strong>Title:</strong> {title || "Title"}
                  </p>
                  <p>
                    <strong>Description:</strong> {description || "Description"}
                  </p>
                  <p>
                    <strong>Stuff:</strong> {stuff || "Material"}
                  </p>
                  <p>
                    <strong>Category:</strong> {category || "Category"}
                  </p>
                  <p>
                    <strong>Brand:</strong> {brand || "Brand"}
                  </p>
                  <p>
                    <strong>Stock:</strong> {stockQuantity || "Quantity"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        status === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full bg-gradient-to-r from-orange-500 to-orange-300 rounded-b-xl shadow-md">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="text-sm bg-white text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-md m-4"
            >
              Close
            </button>
            <div className="space-x-3 m-4">
              <button
                onClick={onClose}
                className="bg-white text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-md"
              >
                Save Draft
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-orange-500 to-orange-300 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-400 transition-all duration-200 shadow-md"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>

        {/* Snackbar */}
        {snackbar.open && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
              snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {snackbar.message}
            <button onClick={handleSnackbarClose} className="ml-4 text-white font-bold">
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductPopup;