import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Product from '@/models/Product';
import dbConnect from '@/lib/db';

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function requireAdmin(req) {
  const token = req.cookies.get('token')?.value;
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.isAdmin ? decoded : null;
  } catch {
    return null;
  }
}

export async function POST(req) {
  try {
    if (!requireAdmin(req)) {
      return jsonResponse({ message: 'Unauthorized' }, 401);
    }
    await dbConnect();
    const data = await req.json();

    const product = new Product({
      title: data.title,
      description: data.description,
      stuff: data.stuff,
      price: parseFloat(data.price),
      productName: data.productName,
      category: data.category,
      brand: data.brand,
      countInStock: parseInt(data.countInStock, 10),
      status: data.status || 'In Stock',
      discount: parseFloat(data.discount) || 0,
      rating: { average: 0, count: 0 },
      wishlist: [],
      images: (data.images || []).filter((img) => img !== null && img !== ''),
      gender: (data.category || '').includes('Ladies') ? 'women' : 'men',
    });

    await product.save();
    return jsonResponse({ message: 'Product added successfully', product }, 201);
  } catch (error) {
    console.error('Products POST error:', error);
    return jsonResponse(
      { message: 'Error adding product', error: error.message },
      500
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    let query = {};
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query = { wishlist: userId };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return jsonResponse(products);
  } catch (error) {
    console.error('Products GET error:', error);
    return jsonResponse(
      { message: 'Error fetching products', error: error.message },
      500
    );
  }
}

export async function DELETE(req) {
  try {
    if (!requireAdmin(req)) {
      return jsonResponse({ message: 'Unauthorized' }, 401);
    }
    await dbConnect();
    const { id } = await req.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return jsonResponse({ message: 'Valid product ID is required' }, 400);
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) return jsonResponse({ message: 'Product not found' }, 404);

    return jsonResponse({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Products DELETE error:', error);
    return jsonResponse(
      { message: 'Error deleting product', error: error.message },
      500
    );
  }
}
