import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
  try {
    const tokenCookie = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    const userCookie = serialize('user', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return new NextResponse(
      JSON.stringify({ message: 'Logout successful' }),
      {
        status: 200,
        headers: {
          'Set-Cookie': [tokenCookie, userCookie],
        },
      }
    );
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}