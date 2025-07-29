import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, enum: ["men", "women"], required: true },
    price: { type: Number, required: true },
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