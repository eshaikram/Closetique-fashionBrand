import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db'; // make sure you have this file
import User from '@/models/User';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, address, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      address,
      email,
      password,
    });

    await user.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
