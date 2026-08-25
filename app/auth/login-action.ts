"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error("[loginAction] Error:", error);
    redirect("/auth/error?error=Invalid credentials");
  }
}
