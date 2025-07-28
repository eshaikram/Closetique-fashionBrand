import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'No token' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await dbConnect();
    const user = await User.findById(decoded._id).select('name email');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: { user_name: user.name, user_email: user.email },
    });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
