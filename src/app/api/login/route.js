import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log('Login attempt:', { email });

    if (!email || !password) {
      console.log('Missing credentials');
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    await dbConnect();
    console.log('Database connected');

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);
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
    console.log('Token generated for user:', user.email);

    const tokenCookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    const userCookie = serialize(
      'user',
      JSON.stringify({ user_name: user.name, user_email: user.email }),
      {
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      }
    );

    return new NextResponse(
      JSON.stringify({
        message: 'Login successful',
        token,
        user: { user_name: user.name, user_email: user.email },
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': [tokenCookie, userCookie],
        },
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}