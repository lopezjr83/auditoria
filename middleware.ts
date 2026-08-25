import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/account/:path*",
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: any) => {
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
});
