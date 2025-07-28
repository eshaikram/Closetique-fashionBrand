import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true }, // Sapphire, Gul Ahmed, etc.
    category: { type: String, required: true }, // Lawn, Khaddar, etc.
    gender: { type: String, enum: ['men', 'women'], required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    images: [{ type: String }], // array of image URLs
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
