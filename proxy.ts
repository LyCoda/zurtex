import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
].join("; ");

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const privateResponse =
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname.startsWith("/consultation/booking");
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  // Proxy headers can override route headers in the deployed Worker. Preserve
  // the stronger policy on booking references and private API responses here.
  response.headers.set(
    "Referrer-Policy",
    privateResponse ? "no-referrer" : "strict-origin-when-cross-origin",
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (privateResponse) {
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return response;
}

export const config = {
  matcher: "/:path*",
};
