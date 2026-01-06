import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  
  // Check for session cookie (Edge-compatible check)
  const hasSessionCookie = 
    req.cookies.has("authjs.session-token") ||
    req.cookies.has("__Secure-authjs.session-token") ||
    req.cookies.has("next-auth.session-token") ||
    req.cookies.has("__Secure-next-auth.session-token");

  // Protect all dashboard routes - redirect to login if no session
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashbaord");
  if (isDashboardRoute && !hasSessionCookie) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page to dashboard
  const isLoginRoute = nextUrl.pathname.startsWith("/login");
  if (isLoginRoute && hasSessionCookie) {
    // Check if there's a callbackUrl in query params (from dashboard redirect)
    const callbackUrl = nextUrl.searchParams.get("callbackUrl");
    // If callbackUrl exists and it's a dashboard route, redirect there instead
    if (callbackUrl && callbackUrl.startsWith("/dashbaord")) {
      return NextResponse.redirect(new URL(callbackUrl, nextUrl.origin));
    }
    // Otherwise, redirect to dashboard
    return NextResponse.redirect(new URL("/dashbaord", nextUrl.origin));
  }

  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * Note: We include login in the matcher to redirect authenticated users away
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|register).*)",
  ],
};

