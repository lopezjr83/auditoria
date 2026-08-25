"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      redirect("/auth/error?error=Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      redirect("/auth/error?error=Invalid email or password");
    }

    // Create JWT token
    const token = signJWT({
      userId: user.id,
      email: user.email || email,
      role: user.role || "USER",
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("[loginAction] Error:", error);
    redirect("/auth/error?error=An error occurred");
  }
}
