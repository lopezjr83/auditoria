import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/account/:path*",
  ],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  console.log("[middleware] Path:", request.nextUrl.pathname);
  console.log("[middleware] Token exists:", !!token);

  if (!token) {
    console.log("[middleware] No token found, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verify JWT token
  const payload = verifyJWT(token);
  console.log("[middleware] Token valid:", !!payload);

  if (!payload) {
    console.log("[middleware] Invalid token, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  console.log("[middleware] Auth successful, allowing request");
  return NextResponse.next();
}
