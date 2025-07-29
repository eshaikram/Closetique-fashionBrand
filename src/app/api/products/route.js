import mongoose from 'mongoose';
import Product from '@/models/Product';
import dbConnect  from '@/lib/db';
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    console.log('Incoming data.status:', data.status); // Debug log
    const product = new Product({
      title: data.title,
      description: data.description,
      stuff: data.stuff,
      price: parseFloat(data.price),
      productName: data.productName,
      category: data.category,
      brand: data.brand,
    countInStock: data.countInStock,
      status: data.status || 'In Stock', // Fallback to default if undefined
      images: data.images.filter(img => img !== null),
      gender: data.category.includes('Ladies') ? 'women' : 'men',
    });

    await product.save();
    console.log('Saved product:', product); // Debug log
    return new Response(JSON.stringify({ 
      message: 'Product added successfully',
      product 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      message: 'Error adding product',
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  try {
      console.time("⏱ MongoDB Fetch Time");
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    
console.timeEnd("⏱ MongoDB Fetch Time");
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      message: 'Error fetching products',
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();
    
    if (!id) {
      return new Response(JSON.stringify({ 
        message: 'Product ID is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return new Response(JSON.stringify({ 
        message: 'Product not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      message: 'Product deleted successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      message: 'Error deleting product',
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}