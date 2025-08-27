import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, enum: ["men", "women"], required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    rating: { 
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 }
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    countInStock: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String },
    status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);