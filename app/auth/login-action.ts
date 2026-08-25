"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJWTEdge } from "@/lib/jwt-edge";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("[loginAction] Attempting login for:", email);

  const user = await prisma.user.findUnique({ where: { email } });
  console.log("[loginAction] User found:", !!user);

  if (!user || !user.passwordHash) {
    console.log("[loginAction] User not found or no password hash");
    redirect("/auth/error?error=Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  console.log("[loginAction] Password valid:", isValidPassword);

  if (!isValidPassword) {
    console.log("[loginAction] Invalid password");
    redirect("/auth/error?error=Invalid email or password");
  }

  // Create JWT token using edge-compatible jose
  const token = await signJWTEdge({
    userId: user.id,
    email: user.email || email,
    role: user.role || "USER",
  });
  console.log("[loginAction] JWT token created:", token.substring(0, 20) + "...");

  // Set cookie with explicit configuration
  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });
  console.log("[loginAction] Cookie set, redirecting to dashboard");

  redirect("/dashboard");
}
