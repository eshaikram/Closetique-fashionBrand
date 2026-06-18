import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    color: { type: String, default: '' },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true },
    sessionId: { type: String, unique: true, sparse: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);
