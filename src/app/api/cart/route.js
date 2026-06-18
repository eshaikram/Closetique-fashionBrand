import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Cart from '@/models/Cart';
import {
  getCartIdentity,
  attachSession,
  identityFilter,
} from '@/lib/cartIdentity';

async function loadCart(identity) {
  const filter = identityFilter(identity);
  let cart = await Cart.findOne(filter);
  if (!cart) cart = await Cart.create({ ...filter, items: [] });
  return cart;
}

function ok(req, identity, cart) {
  const res = NextResponse.json({ success: true, cart: cart.items });
  return attachSession(res, identity);
}

function fail(message, status = 500) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function GET(req) {
  try {
    await dbConnect();
    const identity = getCartIdentity(req);
    const cart = await loadCart(identity);
    return ok(req, identity, cart);
  } catch (err) {
    console.error('Cart GET error:', err);
    return fail(err.message);
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const identity = getCartIdentity(req);
    const body = await req.json();
    const { id, color = '', title, price, image = '', quantity } = body;

    if (!id || !title || typeof price !== 'number' || !Number.isFinite(price)) {
      return fail('Invalid cart payload', 400);
    }
    const qty = Number.parseInt(quantity, 10);
    if (!Number.isFinite(qty) || qty === 0) {
      return fail('Invalid quantity', 400);
    }

    const cart = await loadCart(identity);
    const idx = cart.items.findIndex((i) => i.id === id && i.color === color);

    if (idx > -1) {
      cart.items[idx].quantity += qty;
      if (cart.items[idx].quantity <= 0) cart.items.splice(idx, 1);
    } else if (qty > 0) {
      cart.items.push({ id, color, title, price, image, quantity: qty });
    }

    await cart.save();
    return ok(req, identity, cart);
  } catch (err) {
    console.error('Cart POST error:', err);
    return fail(err.message);
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const identity = getCartIdentity(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const color = searchParams.get('color') ?? '';

    const cart = await loadCart(identity);
    cart.items = cart.items.filter((i) => !(i.id === id && i.color === color));
    await cart.save();
    return ok(req, identity, cart);
  } catch (err) {
    console.error('Cart DELETE error:', err);
    return fail(err.message);
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();
    const identity = getCartIdentity(req);
    const body = await req.json();

    const cart = await loadCart(identity);

    if (body.action === 'clear') {
      cart.items = [];
    } else if (body.action === 'set-quantity') {
      const { id, color = '', quantity } = body;
      const qty = Number.parseInt(quantity, 10);
      if (!Number.isFinite(qty) || qty < 0) return fail('Invalid quantity', 400);
      const idx = cart.items.findIndex((i) => i.id === id && i.color === color);
      if (idx === -1) return fail('Item not in cart', 404);
      if (qty === 0) cart.items.splice(idx, 1);
      else cart.items[idx].quantity = qty;
    } else {
      return fail('Unknown action', 400);
    }

    await cart.save();
    return ok(req, identity, cart);
  } catch (err) {
    console.error('Cart PATCH error:', err);
    return fail(err.message);
  }
}
