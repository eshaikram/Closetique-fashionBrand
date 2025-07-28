import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  console.log('GET /api/user called');
  const token = req.cookies.get('token')?.value;
  console.log('Token received:', token ? 'Valid token' : 'No token');

  if (!token) {
    console.log('No token provided');
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    await dbConnect();
    const user = await User.findById(decoded._id).select('name email isAdmin');
    console.log('Fetched user:', user);

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        user_name: user.name,
        user_email: user.email,
      },
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Error in /api/user:', error.message);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}