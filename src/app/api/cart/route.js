// app/api/cart/route.js
import { NextResponse } from "next/server";

let cart = []; // In-memory (replace with DB in production)

// GET cart
export async function GET() {
  return NextResponse.json({ success: true, cart });
}

// ADD or UPDATE cart item
// ADD or UPDATE cart item
export async function POST(req) {
  const body = await req.json();
  const { id, color, title, price, image, quantity } = body;

  // check if item already exists (same id + color)
  const existingIndex = cart.findIndex(
    (item) => item.id === id && item.color === color
  );

  if (existingIndex > -1) {
    // ✅ increment quantity instead of overwriting
    cart[existingIndex].quantity += quantity;
  } else {
    // ✅ add new item
    cart.push({ id, color, title, price, image, quantity });
  }

  return NextResponse.json({ success: true, cart });
}


// DELETE one item
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const color = searchParams.get("color");

  cart = cart.filter((item) => !(item.id === id && item.color === color));

  return NextResponse.json({ success: true, cart });
}

// CLEAR cart
export async function PATCH(req) {
  const body = await req.json();
  if (body.action === "clear") {
    cart = [];
  }
  return NextResponse.json({ success: true, cart });
}
