"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJWTEdge } from "@/lib/jwt-edge";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash) {
    redirect("/auth/error?error=Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    redirect("/auth/error?error=Invalid email or password");
  }

  // Create JWT token using edge-compatible jose
  const token = await signJWTEdge({
    userId: user.id,
    email: user.email || email,
    role: user.role || "USER",
  });

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

  redirect("/dashboard");
}
