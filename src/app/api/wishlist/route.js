// app/api/wishlist/route.js
import { NextResponse } from "next/server";

// In-memory wishlist store (resets when server restarts)
let wishlist = [];

// Force dynamic rendering
export const dynamic = "force-dynamic";

// GET: Fetch all wishlist items
export async function GET() {
  try {
    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch wishlist", details: error.message },
      { status: 500 }
    );
  }
}

// POST: Toggle product in wishlist
export async function POST(request) {
  try {
    const { productId, title, image, price, discount = 0, rating = 4.5 } =
      await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const existingIndex = wishlist.findIndex((item) => item.productId === productId);

    if (existingIndex > -1) {
      // Remove from wishlist
      wishlist.splice(existingIndex, 1);
      return NextResponse.json({ action: "removed", productId }, { status: 200 });
    } else {
      // Add to wishlist
      const newItem = {
        productId,
        title,
        image: image || "/placeholder-image.jpg",
        price,
        discount,
        rating,
        color: "Default",
        quantity: 1,
      };
      wishlist.push(newItem);
      return NextResponse.json({ action: "added", item: newItem }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update wishlist", details: error.message },
      { status: 500 }
    );
  }
}
