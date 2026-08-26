import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWTEdge } from "@/lib/jwt-edge";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/account/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verify JWT token using edge-compatible jose
  const payload = await verifyJWTEdge(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
