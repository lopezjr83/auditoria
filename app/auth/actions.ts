"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function signInAction(email: string, password: string) {
  try {
    // Verify credentials exist
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      return { success: false, error: "Invalid email or password" };
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return { success: false, error: "Invalid email or password" };
    }

    // If credentials are valid, use signIn to establish session
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    console.error("[signInAction] Error:", error);
    // If it's a redirect error from signIn, that's actually success
    if ((error as any)?.message?.includes("NEXT_REDIRECT")) {
      return { success: true };
    }
    return { success: false, error: "An error occurred" };
  }
}
