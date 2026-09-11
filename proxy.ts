import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com",
  "connect-src 'self' https://*.stripe.com",
  "frame-src https://*.stripe.com https://*.link.com",
  "form-action 'self' https://checkout.stripe.com",
].join('; ');

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store');
  }
  return response;
}

export const config = {
  matcher: '/:path*',
};
