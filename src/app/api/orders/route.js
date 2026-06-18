import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import { getCartIdentity, identityFilter } from '@/lib/cartIdentity';

function getUser(req) {
  const token = req.cookies.get('token')?.value;
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

const SHIPPING_FEE = 5;
const TAX_RATE = 0.05;

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { shipping, paymentMethod = 'cod' } = body || {};

    if (!shipping) return NextResponse.json({ message: 'Shipping required' }, { status: 400 });
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
    for (const f of required) {
      if (!shipping[f] || String(shipping[f]).trim() === '') {
        return NextResponse.json({ message: `Missing field: ${f}` }, { status: 400 });
      }
    }

    const identity = getCartIdentity(req);
    const cart = await Cart.findOne(identityFilter(identity));
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = +(subtotal * TAX_RATE).toFixed(2);
    const shippingFee = SHIPPING_FEE;
    const total = +(subtotal + tax + shippingFee).toFixed(2);

    const decoded = getUser(req);

    const order = await Order.create({
      userId: decoded?._id || undefined,
      items: cart.items,
      shipping,
      paymentMethod,
      subtotal,
      tax,
      shippingFee,
      total,
      status: paymentMethod === 'cod' ? 'pending' : 'paid',
    });

    cart.items = [];
    await cart.save();

    return NextResponse.json({ success: true, orderId: order._id, order }, { status: 201 });
  } catch (err) {
    console.error('Order POST error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const decoded = getUser(req);
    const filter = decoded?.isAdmin ? {} : decoded ? { userId: decoded._id } : null;
    if (!filter) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error('Order GET error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
