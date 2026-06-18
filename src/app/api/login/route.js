import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const isProd = process.env.NODE_ENV === 'production';
    const maxAge = 7 * 24 * 60 * 60;

    const response = NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        user_name: user.name,
        user_email: user.email,
        isAdmin: user.isAdmin,
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge,
      path: '/',
    });

    response.cookies.set(
      'user',
      JSON.stringify({
        user_name: user.name,
        user_email: user.email,
        isAdmin: user.isAdmin,
      }),
      {
        httpOnly: false,
        secure: isProd,
        sameSite: 'lax',
        maxAge,
        path: '/',
      }
    );

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { message: 'Server error', error: err.message },
      { status: 500 }
    );
  }
}
