import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export function getCartIdentity(req) {
  const token = req.cookies.get('token')?.value;
  if (token && process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded?._id) return { userId: decoded._id, sessionId: null, newSession: null };
    } catch {
    }
  }

  const existing = req.cookies.get('cart_session')?.value;
  if (existing) return { userId: null, sessionId: existing, newSession: null };

  const fresh = randomUUID();
  return { userId: null, sessionId: fresh, newSession: fresh };
}

export function attachSession(response, identity) {
  if (identity.newSession) {
    response.cookies.set('cart_session', identity.newSession, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  }
  return response;
}

export function identityFilter({ userId, sessionId }) {
  return userId ? { userId } : { sessionId };
}
