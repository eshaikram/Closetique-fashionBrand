import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PROTECTED_ADMIN = /^\/admin(\/|$)/;
const PROTECTED_USER = /^\/(checkout|orders\/me)(\/|$)/;

async function verify(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const isAdminRoute = PROTECTED_ADMIN.test(pathname);
  const isUserRoute = PROTECTED_USER.test(pathname);

  if (!isAdminRoute && !isUserRoute) return NextResponse.next();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  const payload = await verify(token);
  if (!payload) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    const res = NextResponse.redirect(url);
    res.cookies.delete('token');
    res.cookies.delete('user');
    return res;
  }

  if (isAdminRoute && !payload.isAdmin) {
    const url = req.nextUrl.clone();
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*', '/orders/me/:path*'],
};
